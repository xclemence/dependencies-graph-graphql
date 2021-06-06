const mainResolver = {
  Query: {
    isAlive() {
      return true;
    }
  },
  Mutation: {
    hello: (parent: any, parameters: { name: string }): string => {
      return `Hello ${parameters.name}!`;
    }
  }
};

export default mainResolver;

