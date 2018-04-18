import camelCase from 'to-camel-case';
import { flow } from 'lodash/fp';

const mapClassName = name => name.match(/^_/) ? name.substr(1) : name;

export default flow(mapClassName, camelCase);
