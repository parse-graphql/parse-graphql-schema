import Parse from 'parse/node';
import JSONObject from '../../types/JSONObject'
import createInputType from './inputType'

export default ({ className, displayName, fields }, Type) => ({
  type: Type,
  args: {
    data: {
      type: createInputType({ className, displayName, fields }),
    },
    newProperties: {
      type: JSONObject,
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
