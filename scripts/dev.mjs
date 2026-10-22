import { spawn } from 'node:child_process';

const children = ['@atlas/catalog', '@atlas/compare'].map((workspace) =>
  spawn('npm', ['run', 'dev', '-w', workspace], { stdio: 'inherit' }),
);
let stopping = false;
function stop() {
  if (stopping) return;
  stopping = true;
  for (const child of children) child.kill('SIGTERM');
}
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, stop);
for (const child of children) child.on('exit', (code) => {
  if (!stopping) { process.exitCode = code ?? 1; stop(); }
});
