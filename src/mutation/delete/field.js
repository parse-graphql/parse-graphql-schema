import Parse from 'parse/node';
import { GraphQLNonNull, GraphQLString } from 'graphql';

export default ({ className, displayName }, Type) => ({
  type: Type,
  description: `Delete a ${displayName}. The deleted object is returned.`,
  args: {
    objectId: {
      type: GraphQLNonNull(GraphQLString),
      description: `Object ID of the ${displayName} to delete`,
    }
  },
  resolve(value, { objectId }, { sessionToken }) {
    const object = new Parse.Object(className, { objectId });
    return object.destroy({ sessionToken });
  }
});