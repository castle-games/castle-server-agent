let tasks = require('./tasks');

module.exports = {
  Query: {
    status: async (_, args, context) => {
      return {
        ok: true,
      };
    },
  },
  Mutation: {
    deploy: async (_, args, context) => {
      await tasks.deployAsync();
      return {
        deployed: true,
      };
    },
  },
};
