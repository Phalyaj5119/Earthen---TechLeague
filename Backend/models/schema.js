const { gql } = require('apollo-server-express');
const db = require('../models');

const typeDefs = [];
const resolvers = { Query: {} };

// Merge typeDefs and resolvers from models
for (const modelName in db) {
  const model = db[modelName];
  if (model.graphql) {
    typeDefs.push(model.graphql.typeDef);
    Object.assign(resolvers.Query, model.graphql.resolvers?.Query || {});
  }
}

// Wrap typeDefs with gql correctly
module.exports = {
  typeDefs: gql`${typeDefs.join('\n')}`,
  resolvers
};
