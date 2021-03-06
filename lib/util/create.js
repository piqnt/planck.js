// todo remove this
export default function(proto, props) {
  return Object.create.call(Object, proto, props);
};
