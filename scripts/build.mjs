import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const libDir = join(root, 'lib');
await mkdir(libDir, { recursive: true });

const host = await readFile(join(root, 'src', 'host.js'), 'utf8');
const client = await readFile(join(root, 'src', 'client.js'), 'utf8');

await writeFile(join(libDir, 'index.js'), host, 'utf8');
await writeFile(join(libDir, 'client.js'), `window.__ModuleLoader__.load({\n  id: 'dsh-skills-manager',\n  factory: (require) => {\n    var module = { exports: {} };\n    var exports = module.exports;\n    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\n    ${client}\n    return module.exports;\n  }\n});\n`, 'utf8');

console.log('Built dsh-skills-manager/lib/index.js and lib/client.js');
