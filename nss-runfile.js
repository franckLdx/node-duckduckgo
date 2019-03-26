const { task, taskGroup, run } = require("nss-run");
const shell = require('shelljs')

task('lib:lint', async () => {
  await run('tslint ./src/**/*.ts');
});

task('lib:clean', () => {
  shell.rm('-rf', './lib');
});

task('lib:build', async () => {
  await run('tsc -b', { cwd: './src' });
});

taskGroup("lib", ["lib:lint", "lib:build"]);

task('test:lint', async () => {
  await run('tslint ./test/**/*.ts');
});

task('test:clean', () => {
  shell.rm('-rf', './testTmp');
});

task('test:build', async () => {
  await run('tsc -b', { cwd: './test' });
});

task('test:exec', async () => {
  await run('mocha');
});

taskGroup("test", ["lib", "test:clean", "test:build", "test:exec"]);

task('examples:clean', () => {
  shell.rm('-rf', './examples/ts/*.map');
  shell.rm('-rf', './examples/ts/*.d.ts');
  shell.rm('-rf', './examples/ts/*.js');
});

task('examples:build', async () => {
  await run('tsc -b', { cwd: './examples/ts' });
});

task('examples:exec', async () => {
  await run('node ./examples/ts/simpsons.js');
});

taskGroup("examples", ["examples:clean", "examples:build", "examples:exec"]);