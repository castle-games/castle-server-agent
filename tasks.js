let path = require('path');

let spawnAsync = require('@expo/spawn-async');

function getOpts(opts_) {
  let defaultOpts = {
    deployRoot: '/Users/ccheever/tmp/bet',
    githubUsername: 'ccheever',
  };
  opts = Object.assign({}, defaultOpts, opts_);
  opts.ghostServerDir = path.join(opts.deployRoot, 'ghost-server');
  opts.serverSubdir = path.join(opts.ghostServerDir, 'server');
  opts.secretDir = path.join(opts.deployRoot, 'ghost-secret');
  return opts;
}

async function deployAsync(opts) {
  opts = getOpts(opts);
  await Promise.all([cloneGhostSecretAsync(opts), cloneGhostServerAsync(opts)]);
  await runServerTestsAsync(opts);
  console.log("deployed")
}

async function runServerTestsAsync(opts) {
  opts = getOpts(opts);
  let result = await spawnAsync('yarn', ['test'], {
    cwd: opts.serverSubdir,
  });
  console.log("ran tests")
}

async function cloneGhostServerAsync(opts) {
  opts = getOpts(opts);
  await spawnAsync(
    'git',
    [
      'clone',
      `https://${opts.githubUsername}:${opts.githubToken}@github.com/expo/ghost-server.git`,
    ],
    {
      cwd: opts.deployRoot,
    }
  );
  await spawnAsync('yarn', [], {
    cwd: path.join(opts.deployRoot, 'ghost-server'),
  });
  console.log("cloned and yarned ghost-server");
}

async function cloneGhostSecretAsync(opts) {
  opts = getOpts(opts);
  await spawnAsync(
    'git',
    [
      'clone',
      `https://${opts.githubUsername}:${opts.githubToken}@github.com/expo/ghost-secret.git`,
    ],
    { cwd: opts.deployRoot }
  );
  await spawnAsync('yarn', [], {
    cwd: path.join(opts.deployRoot, 'ghost-secret'),
  });
  console.log("cloned and yarnded ghost-secret");
}

module.exports = {
  deployAsync,
  cloneGhostSecretAsync,
  cloneGhostServerAsync,
};
