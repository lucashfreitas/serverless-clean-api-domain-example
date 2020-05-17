const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
//const CopyPlugin = require('copy-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, './', dir);
}

module.exports = {
  resolve: {
    extensions: ['.js', '.ts', '.graphql', '.gql'],
    alias: {
      '@': resolve('/src'),
    },
  },

  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },

  entry: slsw.lib.entries,
  target: 'node',
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  // Since 'aws-sdk' is not compatible with webpack,
  // we exclude all node dependencies
  externals: [nodeExternals()],
  // Run babel on all .js files and skip those in node_modules
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
        exclude: [
          [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, '.serverless'),
            path.resolve(__dirname, '.webpack'),
          ],
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, './'),
        exclude: [
          [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, '.serverless'),
            path.resolve(__dirname, '.webpack'),
          ],
        ],
      },
      /*{
        test: /\.graphql$/,
        exclude: /node_modules/,
        use: [{ loader: 'graphql-import-loader' }],
      },*/
    ],
  },

  /* Copy generated schema & nexus files)
  plugins: [
    new CopyPlugin([
      {
        from: './src/generated',
        to: 'src/src/generated',
        toType: 'dir',
      },
    ]),
  ],*/
};
