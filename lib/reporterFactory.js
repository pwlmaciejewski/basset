
module.exports = {
  reporters: {
    plain: require('./reporter/plain'),
    json: require('./reporter/json')
  },
  createReporter: function(name) {
    if (!(name in this.reporters)) {
      throw new Error("Unvalid reporter name \"" + name + "\" ");
    }
    return new this.reporters[name]();
  }
};
