const path = require('path');
module.exports = {
  mode:'development',
  entry: './src/ships.js',
  devtool: 'inline-source-map',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};