module.exports = function (value1, value2, options) {
    const v1 = (value1).toString();
    const v2 = value2.toString();
    return v1 === v2 ? options.fn(this) : options.inverse(this);
  };