import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
const patch = await readFile(join(root, 'cordis.patch.yml'), 'utf8');

test('manifest declares canonical identity, license, and compatibility', () => {
  assert.equal(manifest.repository.url, 'git+https://github.com/dong152389/dsh-skills-manager.git');
  assert.equal(manifest.license, 'MIT');
  assert.equal(manifest.engines.node, '>=24.9.0');
  assert.equal(manifest.engines.dsh, '>=0.2.2-rc.0 <0.3.0-0');
  assert.equal(manifest.dsh.compatibility.dsh, '>=0.2.2-rc.0 <0.3.0-0');
  assert.equal(manifest.dsh.compatibility.dshReleases['0.2.2-rc.5'], 'compatible');
  assert.ok(manifest.files.includes('LICENSE'));
  assert.ok(manifest.files.includes('SECURITY.md'));
});

test('Bundle Patch contains unique additive entry IDs', () => {
  const ids = [...patch.matchAll(/^\s*- id:\s*([^\s#]+)\s*$/gm)].map((match) => match[1]);
  assert.deepEqual(ids, ['skills-manager', 'skill-filesystem']);
  assert.equal(new Set(ids).size, ids.length);
});

test('built Host entry is synchronized with source', async () => {
  assert.equal(
    await readFile(join(root, 'src', 'host.js'), 'utf8'),
    await readFile(join(root, 'lib', 'index.js'), 'utf8'),
  );
});

test('settings section label is plain text for the current slot contract', async () => {
  const client = await readFile(join(root, 'src', 'client.js'), 'utf8');
  assert.match(client, /label:\s*'Skills'/);
  assert.doesNotMatch(client, /label:\s*\(\)\s*=>\s*h\(SkillNavLabel\)/);
});
