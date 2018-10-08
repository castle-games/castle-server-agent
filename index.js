let graphqlYoga = require('graphql-yoga');

let resolvers = require('./resolvers');
let typeDefs = require('./typeDefs');

async function serveAsync(opts) {
  opts = opts || {};
  let server = new graphqlYoga.GraphQLServer({ typeDefs, resolvers });
  let port = opts.port || process.env.BEEFEATER_PORT || 1330;
  server.start({
    port,
  });
}

module.exports = {
  serveAsync,
}

if (require.main === module) {
  serveAsync();
}
