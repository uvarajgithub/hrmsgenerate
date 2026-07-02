import { spawnSync } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tscPath = path.join(rootDir, 'node_modules', 'typescript', 'bin', 'tsc');
const outDir = path.join(rootDir, '.tmp-employee-management-tests');
const testSource = path.join('src', 'modules', 'employee-management', 'tests', 'employee-management.test.ts');
const compiledTest = path.join(
  outDir,
  'modules',
  'employee-management',
  'tests',
  'employee-management.test.js'
);

if (existsSync(outDir)) {
  rmSync(outDir, { recursive: true, force: true });
}

const compile = spawnSync(
  process.execPath,
  [
    tscPath,
    '--outDir',
    outDir,
    '--rootDir',
    path.join(rootDir, 'src'),
    '--module',
    'commonjs',
    '--moduleResolution',
    'node',
    '--target',
    'es2020',
    '--lib',
    'ES2020,DOM,DOM.Iterable',
    '--esModuleInterop',
    '--skipLibCheck',
    testSource,
  ],
  {
    cwd: rootDir,
    stdio: 'inherit',
  }
);

if (compile.status !== 0) {
  process.exit(compile.status ?? 1);
}

if (!existsSync(compiledTest)) {
  throw new Error(`Compiled test file was not generated at ${compiledTest}`);
}

const runTests = spawnSync(process.execPath, [compiledTest], {
  cwd: rootDir,
  stdio: 'inherit',
});

process.exit(runTests.status ?? 1);
