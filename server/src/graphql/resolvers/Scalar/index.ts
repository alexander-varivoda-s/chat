import { IResolvers } from 'apollo-server-express';
import { GraphQLScalarType, Kind } from 'graphql';

export const scalarResolvers: IResolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Custom scalar type Date',
    parseValue(value: string) {
      return new Date(value);
    },
    serialize(value: Date) {
      return value.toISOString();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(+ast.value);
      }

      return null;
    }
  })
};
