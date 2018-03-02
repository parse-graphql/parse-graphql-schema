export default function mapType({ type, ...params }, mapping) {
  const getType = mapping[type];
  return getType ? getType(params, mapping) : null;
}
