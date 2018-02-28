import { reduce, keys } from 'lodash';
import defineLazyProperty from './defineLazyProperty';

/**
 * Simple dependency injector.
 * Circular dependencies will not work - but that should never be needed.
 * Uses getters - access dependencies on the returned object as properties
 *
 * @param {Object} defaultData - other dependencies to make available
 * @param {Object} initializerMap - map of functions that take dependencies obj as
 *   parameter and return something
 * @return {Object} Object with the keys of defaultData and initializerMap
 */
function dependencyHelper(defaultData, initializerMap) {
  return reduce(keys(initializerMap), (dependencies, key) => {
    defineLazyProperty(
      dependencies,
      key,
      () => initializerMap[key](dependencies)
    );
  }, { ...defaultData });
}

export default dependencyHelper;
