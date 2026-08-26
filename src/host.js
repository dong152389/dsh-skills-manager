import { Remote, TypertRemoteService } from '@deepseek-ai/dsh-typert-protocol';
import { homedir } from 'node:os';
import { spawn } from 'node:child_process';
import { access, mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';

const EDITABLE_SOURCES = new Set([
  'project-dsh',
  'project-agents',
  'user-dsh',
  'user-agents',
  'custom',
]);

function stringOrEmpty(value) {
  return typeof value === 'string' ? value : '';
}

function optionalString(value) {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

function invocationOf(skill) {
  const invocation = skill && skill.invocation;
  return {
    modelInvocable: invocation ? invocation.modelInvocable === true : false,
    userInvocable: invocation ? invocation.userInvocable === true : false,
  };
}

function resourceBaseOf(skill) {
  const base = skill && skill.resourceBase;
  if (!base || typeof base !== 'object' || typeof base.kind !== 'string') return undefined;
  if (base.kind === 'directory' && typeof base.path === 'string') {
    return { kind: 'directory', path: base.path };
  }
  if (base.kind === 'url' && typeof base.url === 'string') {
    return { kind: 'url', url: base.url };
  }
  if (base.kind === 'opaque' && typeof base.description === 'string') {
    return { kind: 'opaque', description: base.description };
  }
  return undefined;
}

function summaryOf(skill) {
  const summary = {
    name: stringOrEmpty(skill && skill.name),
    description: stringOrEmpty(skill && skill.description),
    invocation: invocationOf(skill),
    source: stringOrEmpty(skill && skill.source),
    provider: stringOrEmpty(skill && skill.provider),
  };
  const whenToUse = optionalString(skill && skill.whenToUse);
  if (whenToUse) summary.whenToUse = whenToUse;
  const resourceBase = resourceBaseOf(skill);
  if (resourceBase) summary.resourceBase = resourceBase;
  return summary;
}

function definitionOf(skill) {
  if (!skill) return null;
  const definition = summaryOf(skill);
  definition.content = stringOrEmpty(skill.content);
  const path = optionalString(skill.path);
  if (path) definition.path = path;
  return definition;
}

function lookupOptions(args) {
  const cwd = optionalString(args && args.cwd);
  return cwd ? { cwd } : {};
}

function isMissing(error) {
  return error && (error.code === 'ENOENT' || error.code === 'ENOTDIR');
}

async function findProjectRoot(cwd) {
  let current = resolve(cwd || process.cwd());
  while (true) {
    try {
      await access(join(current, '.git'));
      return current;
    } catch (error) {
      if (!isMissing(error)) throw error;
    }
    const parent = dirname(current);
    if (parent === current) return resolve(cwd || process.cwd());
    current = parent;
  }
}

function dshHome() {
  const configured = optionalString(process.env.DSH_HOME);
  return configured ? resolve(configured) : join(homedir(), '.dsh');
}

function agentsHome() {
  const configured = optionalString(process.env.DSH_AGENTS_HOME);
  return configured ? resolve(configured) : join(homedir(), '.agents');
}

async function resourceDirectory(target, cwd) {
  const normalizedTarget = optionalString(target) || (cwd ? 'project-agents' : 'user-dsh');
  if (normalizedTarget === 'project-dsh' || normalizedTarget === 'project-agents') {
    const projectRoot = await findProjectRoot(cwd);
    return join(projectRoot, normalizedTarget === 'project-dsh' ? '.dsh' : '.agents', 'skills');
  }
  if (normalizedTarget === 'user-dsh' || normalizedTarget === 'user-agents') {
    return join(normalizedTarget === 'user-dsh' ? dshHome() : agentsHome(), 'skills');
  }
  throw new Error('不支持的资源目录。');
}

async function openResourceFolder(path) {
  await mkdir(path, { recursive: true });
  const command = process.platform === 'win32'
    ? 'explorer.exe'
    : process.platform === 'darwin'
      ? 'open'
      : 'xdg-open';
  const child = spawn(command, [resolve(path)], {
    detached: true,
    stdio: 'ignore',
    windowsHide: true,
  });
  await new Promise((resolveLaunch, rejectLaunch) => {
    child.once('spawn', resolveLaunch);
    child.once('error', rejectLaunch);
  });
  child.unref();
}

function editableSkill(skill) {
  return Boolean(skill && skill.path && EDITABLE_SOURCES.has(skill.source));
}

function updateInvocationFrontmatter(content, field, enabled) {
  const header = /^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/.exec(content);
  if (!header) throw new Error('Skill 文件缺少有效的 YAML frontmatter。');
  const newline = content.includes('\r\n') ? '\r\n' : '\n';
  const lines = header[1].split(/\r?\n/).filter((line) => !new RegExp(`^${field}\\s*:`).test(line));
  if (!enabled) lines.push(`${field}: ${field === 'disable-model-invocation' ? 'true' : 'false'}`);
  const frontmatter = lines.join(newline);
  const suffix = content.slice(header[0].length);
  return `---${newline}${frontmatter}${newline}---${suffix ? newline + suffix : ''}`;
}

function optionalFs(ctx) {
  try {
    const fs = ctx.get('fs');
    return fs && typeof fs.resolve === 'function' && typeof fs.stat === 'function'
      && typeof fs.readText === 'function' && typeof fs.writeText === 'function'
      ? fs
      : undefined;
  } catch (_error) {
    return undefined;
  }
}

async function writeManagedText(ctx, path, content, expected) {
  const fs = optionalFs(ctx);
  if (fs) {
    const target = await fs.resolve(path);
    const result = await fs.writeText(target, content, expected);
    return { target, version: result && result.version };
  }
  await mkdir(dirname(path), { recursive: true });
  if (expected && expected.kind === 'createIfAbsent') {
    try {
      await stat(path);
      throw new Error(`目标文件已存在：${path}`);
    } catch (error) {
      if (!isMissing(error)) throw error;
    }
  }
  if (expected && expected.kind === 'replaceIfVersion') {
    let current;
    try {
      current = await stat(path);
    } catch (error) {
      if (isMissing(error)) throw new Error('Skill 文件已被删除，请刷新目录后重试。');
      throw error;
    }
    const currentVersion = `${current.mtimeMs}:${current.size}`;
    if (currentVersion !== expected.version) throw new Error('Skill 文件刚刚发生变化，请刷新目录后重试。');
  }
  await writeFile(path, content, 'utf8');
  const after = await stat(path);
  return { target: null, version: `${after.mtimeMs}:${after.size}` };
}

async function readManagedText(ctx, path) {
  const fs = optionalFs(ctx);
  if (fs) {
    const target = await fs.resolve(path);
    const info = await fs.stat(target);
    if (!info || info.type !== 'file') throw new Error('Skill 文件不存在或不是普通文件。');
    return { content: await fs.readText(target), target, version: info.version };
  }
  const info = await stat(path);
  return { content: await readFile(path, 'utf8'), target: null, version: `${info.mtimeMs}:${info.size}` };
}

function notifySkillChange(ctx, target, version) {
  if (!ctx || typeof ctx.emit !== 'function') return;
  try {
    if (target) {
      ctx.emit('fs/observed', target, { kind: 'present', version }, { name: 'write' });
    }
  } catch (_error) {
    // The filesystem provider watcher remains the fallback invalidation path.
  }
  try {
    ctx.emit('skills/change');
  } catch (_error) {
    // Older DSH profiles may not declare this optional event.
  }
}

function markRemoteMethods(service) {
  for (const method of ['catalog', 'detail', 'openFolder', 'toggle']) {
    const initializers = [];
    const context = {
      name: method,
      static: false,
      private: false,
      addInitializer(fn) { initializers.push(fn); },
    };
    Remote(method)(undefined, context);
    for (const initializer of initializers) initializer.call(service);
  }
}

class SkillsManagerService extends TypertRemoteService {
  constructor(ctx, skills) {
    super(ctx, 'skillsManager');
    this.skills = skills;
    markRemoteMethods(this);
  }

  async catalog(payload) {
    const snapshot = await this.skills.snapshot(lookupOptions(payload));
    const entries = Array.isArray(snapshot && snapshot.skills) ? snapshot.skills : [];
    return {
      complete: snapshot ? snapshot.complete === true : false,
      skills: entries.map(summaryOf),
    };
  }

  async detail(payload) {
    const name = optionalString(payload && payload.name);
    if (!name) return null;
    const skill = await this.skills.get(name, lookupOptions(payload));
    return definitionOf(skill);
  }

  async openFolder(payload) {
    const input = payload && typeof payload === 'object' ? payload : {};
    const cwd = optionalString(input.cwd);
    const path = await resourceDirectory(input.target, cwd);
    await openResourceFolder(path);
    return {
      path,
      target: input.target || (cwd ? 'project-agents' : 'user-agents'),
    };
  }

  async toggle(payload) {
    const input = payload && typeof payload === 'object' ? payload : {};
    const name = optionalString(input.name);
    const field = input.field === 'model' ? 'disable-model-invocation' : input.field === 'user' ? 'user-invocable' : '';
    if (!name || !field || typeof input.enabled !== 'boolean') throw new Error('启用设置参数无效。');
    const options = lookupOptions(input);
    const skill = await this.skills.get(name, options);
    if (!skill) return null;
    if (!editableSkill(skill)) throw new Error('该 Skill 来自只读来源，不能在这里修改。');
    const original = await readManagedText(this.ctx, skill.path);
    const updated = updateInvocationFrontmatter(original.content, field, input.enabled);
    if (updated === original.content) return definitionOf(skill);
    const expected = original.version === undefined ? undefined : { kind: 'replaceIfVersion', version: original.version };
    const written = await writeManagedText(this.ctx, skill.path, updated, expected);
    notifySkillChange(this.ctx, written.target, written.version);
    const changed = await this.skills.get(name, options);
    const result = definitionOf(changed || skill);
    result.invocation = Object.assign({}, result.invocation, field === 'user-invocable'
      ? { userInvocable: input.enabled }
      : { modelInvocable: input.enabled });
    return result;
  }
}

function registerDescriptors(ctx, typert, descriptors) {
  try {
    const wire = (name) => ({ name, wire: name, source: 'json', codec: { mode: 'src-json' } });
    const contribution = {
      package: 'dsh-skills-manager',
      face: 'host',
      model: {},
      schemas: [],
      invocations: descriptors.map((descriptor) => ({
        id: `dsh-skills-manager#${descriptor.namespace}/${descriptor.method}`,
        service: descriptor.namespace,
        namespace: descriptor.namespace,
        method: descriptor.method,
        invocation: { kind: 'direct' },
        parameters: descriptor.parameters.map(wire),
        result: { mode: 'src-json' },
      })),
    };
    return typert.register(contribution);
  } catch (error) {
    console.error('[dsh-skills-manager] typert strict registration failed:', error && error.message);
    return () => {};
  }
}

export function apply(ctx) {
  const skills = ctx.skills;
  if (skills === undefined) return;

  const service = new SkillsManagerService(ctx, skills);

  const typert = ctx.typert;
  if (typert && typeof typert.register === 'function') {
    const dispose = registerDescriptors(ctx, typert, [
      { namespace: 'skillsManager', method: 'catalog', parameters: ['payload'] },
      { namespace: 'skillsManager', method: 'detail', parameters: ['payload'] },
      { namespace: 'skillsManager', method: 'openFolder', parameters: ['payload'] },
      { namespace: 'skillsManager', method: 'toggle', parameters: ['payload'] },
    ]);
    ctx.effect(() => dispose, 'dsh-skills-manager: typert descriptors');
  } else {
    console.warn('[dsh-skills-manager] typert service unavailable, SRC markers remain:',
      service && service.typertRemote ? service.typertRemote.namespace : 'none');
  }
}

export const name = 'dsh-skills-manager';
export const inject = ['skills', 'typert'];
