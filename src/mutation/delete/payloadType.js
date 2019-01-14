import { GraphQLObjectType } from 'graphql'
import { camelCase } from 'change-case'

export default ({ className, displayName }, Type) => new GraphQLObjectType({
  name: `Delete${displayName}Payload`,
  fields: {
    [camelCase(displayName)]: {
      type: Type,
      description: `The deleted ${displayName}`,
      resolve(object) {
        return object;
      },
    },
  },
});
