const config = require('./nuxt.config.js');

config.build.filenames = {
    app: '[name].js',
  chunk: '[name].js'
};
// console.log(config.build);
module.exports = () => {
  return config;
}
