/* eslint-disable func-names */
const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

module.exports = (env) => {
  // https://medium.com/@trekinbami/using-environment-variables-in-react-6b0a99d83cf5
  // Get the root path (assuming your webpack config is in the root of your project!)
  const currentPath = path.join(__dirname);
  // Create the fallback path (the production .env)
  const basePath = `${currentPath}/.env`;
  // We're concatenating the environment name to our filename to specify the correct env file!
  const envPath = `${basePath}.${env.ENVIRONMENT}`;
  // Check if the file exists, otherwise fall back to the production .env
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;
  // Set the path parameter in the dotenv config
  const fileEnv = dotenv.config({ path: finalPath }).parsed;
  // reduce it to a nice object, the same as before (but with the variables from the file)
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    // eslint-disable-next-line no-param-reassign
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});
  return {
    entry: './src/index.js',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js',
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin(envKeys),
    ],
    devServer: {
      contentBase: './dist',
      port: 3000,
      hot: true,
      proxy: { '/api/**': { target: 'http://localhost:3001', secure: false } },
    },
  };
};
