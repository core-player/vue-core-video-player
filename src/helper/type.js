export function isNumber (num) {
  return typeof num === 'number'
};

export function isString (str) {
  return typeof str === 'string'
};

export function isObject (obj) {
  return obj && typeof obj === 'object'
};

export function isFile (obj) {
  return obj instanceof File
}

export function isNaN (num) {
  // eslint-disable-next-line no-self-compare
  return typeof num === 'number' && num !== num
}
