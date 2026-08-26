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
  assert.equal(manifest.engines.node, '>=18.0.0');
  assert.equal(manifest.dsh.compatibility.dsh, '>=0.1.1-rc.2 <0.2.0');
  assert.equal(manifest.dsh.compatibility.dshReleases['0.1.1-rc.2'], 'compatible');
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
