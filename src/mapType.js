export default function mapType({ type, ...params }, mapping) {
  return mapping[type](params);
}
