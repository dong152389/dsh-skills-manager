import { Remote, TypertRemoteService } from '@deepseek-ai/dsh-typert-protocol';

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

function markRemoteMethods(service) {
  for (const method of ['catalog', 'detail']) {
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
    ]);
    ctx.effect(() => dispose, 'dsh-skills-manager: typert descriptors');
  } else {
    console.warn('[dsh-skills-manager] typert service unavailable, SRC markers remain:',
      service && service.typertRemote ? service.typertRemote.namespace : 'none');
  }
}

export const name = 'dsh-skills-manager';
export const inject = ['skills', 'typert'];
