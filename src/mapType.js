import JSON from 'graphql-type-json';

export default function mapType({ type, ...params }, mapping) {
  console.log(type, params);
  const getType = mapping[type];
  return getType ? getType(params, mapping) : JSON;
}
