module.exports = /* GraphQL */ `
  scalar Json
  scalar Datetime
  scalar Null

  type Query {
    status: Json
  }

  type Mutation {
    deploy: Json
  }

`;
