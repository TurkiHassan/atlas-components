import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const temporary = await fs.mkdtemp(path.join(os.tmpdir(), 'atlas-package-'));
try {
  const { version } = JSON.parse(await fs.readFile(path.join(root, 'packages/ui/package.json'), 'utf8'));
  const packageFile = path.join(root, `artifacts/atlas-ui-${version}.tgz`);
  await fs.writeFile(path.join(temporary, 'package.json'), JSON.stringify({ name: 'atlas-consumer-smoke', private: true, type: 'module', dependencies: { '@atlas/ui': `file:${packageFile}`, react: '19.3.1', 'react-dom': '19.3.1' } }));
  const install = spawnSync('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund', '--workspaces=false'], { cwd: temporary, encoding: 'utf8' });
  if (install.status !== 0) throw new Error(install.stderr);
  await fs.writeFile(path.join(temporary, 'verify.mjs'), `import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { Button, Modal } from '@atlas/ui';
import { Button as OriginalButton, Modal as OriginalModal } from '@mantine/core';
assert.equal(Button, OriginalButton);
assert.equal(Modal, OriginalModal);
const paths = ['hooks','form','dates','charts','notifications','modals','dropzone','spotlight','carousel','editor','table','virtual','motion','icons','numbers','tiptap','theme'];
for (const entry of paths) assert.ok(Object.keys(await import('@atlas/ui/'+entry)).length > 0);
for (const entry of ['styles.css', ...['dates','charts','notifications','dropzone','spotlight','carousel','editor','table'].map(p=>p+'/styles.css')]) assert.ok((await fs.readFile(new URL(import.meta.resolve('@atlas/ui/'+entry)), 'utf8')).includes('@import'));
assert.ok((await fs.readFile(new URL(import.meta.resolve('@atlas/ui/fonts.css')), 'utf8')).includes('@font-face'));
console.log(JSON.stringify({ status: 'passed', testedImports: paths.length+1, cssEntryPoints: 10, upstreamIdentity: ['Button','Modal'] }));
`);
  const verify = spawnSync(process.execPath, ['verify.mjs'], { cwd: temporary, encoding: 'utf8' });
  if (verify.status !== 0) throw new Error(verify.stderr);
  const report = { checkedOn: '2026-10-22', ...JSON.parse(verify.stdout), note: 'Fresh consumer installs the tarball with exact React versions, imports every JS entry, resolves CSS entries, and checks upstream identity. No upstream install scripts executed.' };
  await fs.writeFile(path.join(root, 'artifacts/package-smoke.json'), JSON.stringify(report, null, 2)+'\n');
  console.log(JSON.stringify(report, null, 2));
} finally {
  await fs.rm(temporary, { recursive: true, force: true });
}
