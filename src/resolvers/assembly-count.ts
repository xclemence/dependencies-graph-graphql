import { Context } from "../types/context";

const assemblyCountResolver = {
  Query: {
    async assemblyCount(_: any, params: any, context: Context) {

      const assembly = context.ogm.model("Assembly");
      const result = await assembly.find({where: params.where, selectionSet: '{ isDebug }'});
      return result.length;
    },
  },
};

export default assemblyCountResolver;

