export const isString = (input) => {
  return Object.prototype.toString.call(input) === '[object String]';
}
export const isNumber = (input) => {
  return input instanceof Number || Object.prototype.toString.call(input) === '[object Number]';
}

export const isObject = (input) => {
  return Object.prototype.toString.call(input) === '[object Object]';
}
export const isArray = (input) => {
  return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
}
export const isDate = (input) => {
  return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
}

export const isHtmlElement = (node) => {
  return node && node.nodeType === Node.ELEMENT_NODE;
}

export const isFunction = (functionToCheck) => {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

export const isBoolean = (input) => {
  return typeof input == 'boolean';
}

export const isNull = (input) => {
  return input === undefined || input === null;
}

export const isUndefined = (val) => {
  return val === void 0;
};

export const isDefined = (val) => {
  return val !== undefined && val !== null;
};


