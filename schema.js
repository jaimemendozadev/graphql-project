const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');



//Hardcoded data
const customers = [
  {id: '1', name: 'John Doe', email: 'jdoe@gmail.com', age: 35},
  {id: '2', name: 'Steve Smith', email: 'steve@gmail.com', age: 25},
  {id: '3', name: 'Sarah Williams', email: 'sara@gmail.com', age: 32}
];

//Cutomer Type
const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
      id: {type: GraphQLString},
      name: {type: GraphQLString},
      email: {type: GraphQLString},
      age: {type: GraphQLInt}
    })
  });


//Root Query 
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: ()=> ({
    customer: {
      type: CustomerType,
      args: {
        id: {type: GraphQLString}
      },
      resolve(parentValue, args){
        for (let i = 0; i < customers.length; i++){
          if(customers[i].id == args.id) {
            return customers[i];
          }
        }
      }
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args){
        return customers;
      }
    }

  })
});


module.exports = new GraphQLSchema({
  query: RootQuery
});




/*
  
  GraphQLSchema needs root query, which is the baseline for all other queries.

  You can crate as many ObjectTypes as you want, but you do need the RootQuery.

*/