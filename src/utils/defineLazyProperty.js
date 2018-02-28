/**
 * Define a property whose value isn't computed until it is accessed,
 * at which point it is stored
 *
 * @param {Object} object - Object to set property on
 * @param {String} key - key of property
 * @param {Function} valueFunc - function that returns the value, only called once
 */
function defineLazyProperty(object, key, valueFunc) {
  Object.defineProperty(object, key, {
    configurable: true,
    enumerable: true,
    get() {
      delete this[key];
      Object.defineProperty(this, key, {
        enumerable: true,
        value: valueFunc(),
      });
      console.log(key, this[key]);
      return this[key];
    },
  });
}

export default defineLazyProperty;
