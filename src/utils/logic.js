export const and = (func, ...funcs) => (...args) => (
  funcs.length
    ? func(...args) && and(...funcs)(...args)
    : func(...args)
);

export const or = (func, ...funcs) => (...args) => (
  funcs.length
    ? func(...args) || or(...funcs)(...args)
    : func(...args)
);
