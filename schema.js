const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

/*
  GraphQLSchema needs root query, which is the baseline for all other queries.
*/
module.exports = new GraphQLSchema({
  
});