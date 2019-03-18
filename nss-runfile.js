const { task, taskGroup, run } = require("nss-run");

task('lib:lint', async () => {
  await run('tslint ./src/**/*.ts');
});

task('lib:clean', async () => {
  await run('tsc -b', { cwd: './src' });
});

task('lib:build', async () => {
  await run('tsc -b', { cwd: './src' });
});

taskGroup("lib", ["lib:clean", "lib:lint", "lib:build"]);

task('test:lint', async () => {
  await run('tslint ./test/**/*.ts');
});

task('test:build', async () => {
  await run('tsc -b', { cwd: './test' });
});

task('test:exec', async () => {
  await run('mocha');
});

taskGroup("test", ["lib:build", "test:build", "test:exec"]);
taskGroup("test:full", ["lib", "test"]);
