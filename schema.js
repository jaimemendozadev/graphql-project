const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');


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
        /*
        for (let i = 0; i < customers.length; i++){
          if(customers[i].id == args.id) {
            return customers[i];
          }
        }
        */

        return axios.get(`http://localhost:3000/customers/${args.id}`)
                 .then(res => {
                   return res.data;
                 });


      }
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args){
        //return customers;

        return axios.get('http://localhost:3000/customers/')
               .then(res => {
                 return res.data;
               });
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