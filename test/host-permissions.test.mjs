import test from 'node:test';
import assert from 'node:assert/strict';
import { dirname, resolve } from 'node:path';
import { scopedWritePolicy } from '../src/host.js';

test('scopedWritePolicy limits settings writes to the skill file directory', () => {
  const skillPath = resolve('C:/Users/Administrator/.dsh/skills/example/SKILL.md');

  assert.deepEqual(scopedWritePolicy(skillPath), {
    mode: 'workspace-write',
    workspaceRoot: dirname(skillPath),
  });
});

