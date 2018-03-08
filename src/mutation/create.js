import Parse from 'parse/node';
import JSONObject from '../types/JSONObject'

export default (parseClass, Type) => ({
  type: Type,
  args: {
    data: {
      type: JSONObject,
    },
  },
  resolve(value, { data }, context, info) {
    const object = new Parse.Object(parseClass, data);
    return object.save();
  },
});
