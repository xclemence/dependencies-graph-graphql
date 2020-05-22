const resolvers = {
    Query: {
      test(object: any, params: any, ctx : any, resolveInfo: any) {
        return { message: "Welcome to Dependencies GraphQL Services" };
      }
    }
  };

export default resolvers;
