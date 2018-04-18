import Parse from 'parse/node';
import JSONObject from '../../types/JSONObject';
import updateInputType from './inputType';

export default ({ className, displayName, fields }, Type) => ({
  type: Type,
  args: {
    data: {
      type: updateInputType({ className, displayName, fields }),
    },
    newProperties: {
      type: JSONObject,
    },
  },
  async resolve(value, { data, newProperties }, { sessionToken }, info) {
    const existing = await new Parse.Query(className).get(data.objectId);
    if (!existing) {
      throw new Error('Item not found');
    }
    const object = new Parse.Object(className, {
      ...data,
      ...newProperties,
    });
    return object.save({ sessionToken });
  },
});
