import fs from 'node:fs/promises';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'apps/compare/dist');
const manifest = JSON.parse(await fs.readFile(path.join(output, '.vite/manifest.json'), 'utf8'));
const entries = [];
for (const [key, name] of [['hero.html', 'HeroUI 3.2.6'], ['mantine.html', 'Mantine 9.7.3 + DataTable']]) {
  const visited = new Set();
  const files = new Set();
  function visit(entry) {
    if (visited.has(entry)) return;
    visited.add(entry);
    const chunk = manifest[entry];
    files.add(chunk.file);
    for (const css of chunk.css ?? []) files.add(css);
    for (const imported of chunk.imports ?? []) visit(imported);
  }
  visit(key);
  let jsGzip = 0, cssGzip = 0, jsBytes = 0, cssBytes = 0;
  for (const file of files) {
    const bytes = await fs.readFile(path.join(output, file));
    if (file.endsWith('.js')) { jsBytes += bytes.length; jsGzip += gzipSync(bytes).length; }
    if (file.endsWith('.css')) { cssBytes += bytes.length; cssGzip += gzipSync(bytes).length; }
  }
  entries.push({ name, jsBytes, jsGzip, cssBytes, cssGzip, fontBytes: 0, files: [...files].sort() });
}
const report = { available: true, checkedOn: '2026-10-22', entries, method: 'Sum of each entry and statically imported JS/CSS file, gzip per file. All four demo tasks are bundled per library. Font binaries, HTML, comparison shell and network overhead excluded. Mantine uses DataTable; HeroUI uses its own Table and Pagination. This is a fixture size comparison, not a speed benchmark.' };
const serialized = JSON.stringify(report, null, 2) + '\n';
await fs.mkdir(path.join(root, 'apps/compare/public'), { recursive: true });
for (const target of ['apps/compare/public/build-metrics.json', 'apps/compare/dist/build-metrics.json', 'artifacts/comparison-build-metrics.json']) await fs.writeFile(path.join(root, target), serialized);
await fs.cp(output, path.join(root, 'apps/catalog/dist/compare'), { recursive: true });
console.log(entries.map(({ files, ...entry }) => entry));
