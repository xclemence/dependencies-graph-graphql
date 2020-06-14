
const resolvers = {
    Query: {
      isAlive(object: any, params: any, ctx : any, resolveInfo: any) {
        return true;
      }
    },
    Mutation: {
      hello: (parent: any, parameters: {name: String}, context: any, info: any): String => {
        return `Hello ${parameters.name}!`;
      }
    }
  };

export default resolvers;
