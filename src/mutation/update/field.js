import Parse from 'parse/node';
import { GraphQLNonNull } from 'graphql';
import JSONObject from '../../types/JSONObject';
import inputType from './inputType';

export default ({ className, displayName, fields }, Type) => ({
  type: Type,
  description: `Update an existing ${displayName}`,
  args: {
    input: {
      type: GraphQLNonNull(inputType({ className, displayName, fields })),
    },
    newAttributes: {
      type: JSONObject,
      description: "Allows saving attributes that don't exist yet"
    },
  },
  async resolve(value, { input, newAttributes }, { sessionToken }) {
    const existing = await new Parse.Query(className).get(input.objectId);
    if (!existing) {
      throw new Error('Item not found');
    }
    const object = new Parse.Object(className, {
      ...input,
      ...newAttributes,
    });
    return object.save({ sessionToken });
  },
});
