import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const lock = JSON.parse(await fs.readFile(path.join(root, 'package-lock.json'), 'utf8'));
const ui = JSON.parse(await fs.readFile(path.join(root, 'packages/ui/package.json'), 'utf8'));
const records = [];
const licenseDirectory = path.join(root, 'licenses');
await fs.mkdir(licenseDirectory, { recursive: true });
for (const [location, metadata] of Object.entries(lock.packages)) {
  if (!location.includes('node_modules/') || metadata.link) continue;
  const directory = path.join(root, location);
  let pkg;
  try { pkg = JSON.parse(await fs.readFile(path.join(directory, 'package.json'), 'utf8')); }
  catch { continue; }
  const licenses = [];
  for (const name of await fs.readdir(directory)) {
    if (!/^(licen[cs]e|copying|notice|ofl)(\.|$|-)/i.test(name)) continue;
    const source = path.join(directory, name);
    if (!(await fs.stat(source)).isFile()) continue;
    const output = `${pkg.name.replaceAll('/', '__').replaceAll('@', '')}-${pkg.version}-${name.replaceAll('/', '_')}.txt`;
    await fs.copyFile(source, path.join(licenseDirectory, output));
    licenses.push(`licenses/${output}`);
  }
  if (licenses.length === 0 && ['embla-carousel', 'embla-carousel-react', 'embla-carousel-reactive-utils'].includes(pkg.name) && pkg.version === '8.6.0') {
    const output = `${pkg.name}-${pkg.version}-LICENSE.txt`;
    await fs.copyFile(path.join(root, 'research/embla-carousel-8.6.0-LICENSE.txt'), path.join(licenseDirectory, output));
    licenses.push(`licenses/${output}`);
  }
  if (pkg.name === 'victory-vendor') {
    const vendorDirectory = path.join(directory, 'lib-vendor');
    for (const vendor of await fs.readdir(vendorDirectory)) {
      const source = path.join(vendorDirectory, vendor, 'LICENSE');
      try {
        const output = `victory-vendor-${pkg.version}-${vendor}-LICENSE.txt`;
        await fs.copyFile(source, path.join(licenseDirectory, output));
        licenses.push(`licenses/${output}`);
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
      }
    }
  }
  if (pkg.name === 'react-remove-scroll-bar' && pkg.version === '2.3.8') {
    const output = 'react-remove-scroll-bar-2.3.8-LICENSE.txt';
    await fs.copyFile(path.join(root, 'research', output), path.join(licenseDirectory, output));
    licenses.push(`licenses/${output}`);
  }
  if (pkg.name === '@rolldown/binding-darwin-arm64') {
    const output = `rolldown-binding-${pkg.version}-LICENSE.txt`;
    await fs.copyFile(path.join(root, 'node_modules/rolldown/LICENSE'), path.join(licenseDirectory, output));
    licenses.push(`licenses/${output}`);
  }
  const licenseNote = ['@heroui/react', '@heroui/styles'].includes(pkg.name)
    ? 'Package metadata declares MIT; the shipped LICENSE text is Apache-2.0. Text preserved as shipped. This does not establish dual licensing. Used by the isolated comparison app only.'
    : undefined;
  records.push({ name: pkg.name, version: pkg.version, license: pkg.license ?? metadata.license ?? 'UNDECLARED', licenseNote, repository: pkg.repository ?? null, homepage: pkg.homepage ?? null, npm: `https://www.npmjs.com/package/${pkg.name}/v/${pkg.version}`, resolved: metadata.resolved, integrity: metadata.integrity, developmentOnly: Boolean(metadata.dev), directLibraryDependency: Object.hasOwn(ui.dependencies, pkg.name), licenseFiles: licenses });
}
records.sort((a, b) => a.name.localeCompare(b.name));
const missingDirect = records.filter((r) => r.directLibraryDependency && r.licenseFiles.length === 0);
if (missingDirect.length) throw new Error('Missing upstream license texts: '+missingDirect.map((r) => r.name).join(', '));
const document = { checkedOn: '2026-10-22', note: 'Installed packages only; platform-specific optional packages absent on this machine are not copied. Includes tooling and catalog dependencies, explicitly marked.', packages: records };
await fs.writeFile(path.join(root, 'research/installed-provenance.json'), JSON.stringify(document, null, 2)+'\n');
const notices = '# Third-party notices\n\nAtlas is an integration of upstream packages. Component implementations remain owned by their respective authors. License texts are preserved without editing in the accompanying licenses directory. This inventory includes development tools as well as library and catalog dependencies.\n\n| Package | Version | Declared license | Scope | License text |\n|---|---|---|---|---|\n'+records.map((r) => `| [${r.name}](${r.npm}) | ${r.version} | ${typeof r.license === 'string' ? r.license : JSON.stringify(r.license)} | ${r.directLibraryDependency ? 'library direct' : r.developmentOnly ? 'tooling' : 'catalog / transitive'} | ${r.licenseFiles.map((file) => `[${path.basename(file)}](${file})`).join(', ') || 'No standalone text shipped; inspect package source'} |`).join('\n')+'\n';
const documentedNotices = notices + '\n## Metadata discrepancies\n\n' + records.filter((record) => record.licenseNote).map((record) => '- ' + record.name + ': ' + record.licenseNote).join('\n') + '\n';
await fs.writeFile(path.join(root, 'THIRD_PARTY_NOTICES.md'), documentedNotices);
await fs.writeFile(path.join(root, 'packages/ui/THIRD_PARTY_NOTICES.md'), documentedNotices);
await fs.cp(licenseDirectory, path.join(root, 'packages/ui/licenses'), { recursive: true });
console.log(`Recorded ${records.length} installed packages. Direct library license texts: complete. ${records.filter((r)=>!r.licenseFiles.length).length} transitive/tooling packages do not ship a standalone root license text; metadata retained.`);
