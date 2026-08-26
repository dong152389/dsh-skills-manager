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

export function apply(ctx) {
  const skills = ctx.get('skills');
  if (skills === undefined) return;

  new SkillsManagerService(ctx, skills);

  const typert = ctx.get('typert');
  if (typert && typeof typert.register === 'function') {
    const wire = (name) => ({ name, wire: name, source: 'json', codec: { mode: 'src-json' } });
    const descriptor = {
      package: 'dsh-skills-manager',
      face: 'host',
      model: {},
      schemas: [],
      invocations: [
        {
          id: 'dsh-skills-manager#skillsManager/catalog',
          service: 'skillsManager',
          namespace: 'skillsManager',
          method: 'catalog',
          invocation: { kind: 'direct' },
          parameters: [wire('payload')],
          result: { mode: 'src-json' },
        },
        {
          id: 'dsh-skills-manager#skillsManager/detail',
          service: 'skillsManager',
          namespace: 'skillsManager',
          method: 'detail',
          invocation: { kind: 'direct' },
          parameters: [wire('payload')],
          result: { mode: 'src-json' },
        },
      ],
    };
    ctx.effect(() => typert.register(descriptor), 'dsh-skills-manager: typert descriptors');
  }
}

export const name = 'dsh-skills-manager';
export const inject = ['skills'];
