import Parse from 'parse/node';
import JSONObject from '../../types/JSONObject'
import inputType from './inputType'

export default ({ className, displayName, fields }, Type) => ({
  type: Type,
  description: `Create a new ${displayName}`,
  args: {
    data: {
      type: inputType({ className, displayName, fields }),
    },
    newAttributes: {
      type: JSONObject,
      description: "Allows saving attributes that don't exist yet"
    }
  },
  resolve(value, args, { sessionToken }) {
    const { data, newProperties } = args;
    if (newProperties && 'objectId' in newProperties) {
      throw new Error('objectId not allowed in a create mutation');
    }
    const object = new Parse.Object(className, {
      ...data,
      ...newProperties,
    });
    return object.save({ sessionToken });
  },
});
