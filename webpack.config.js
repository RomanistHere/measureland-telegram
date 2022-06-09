const path = require('path');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  target: "webworker",
  output: {
    filename: 'worker.js',
    path: path.join(__dirname, 'dist'),
  },
  mode: 'production',
  resolve: {
    fallback: {
      "fs": false
    },
  },
  plugins: [
    new NodePolyfillPlugin()
  ],
}
