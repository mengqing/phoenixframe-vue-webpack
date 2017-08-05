/**
 * Modules
 */
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * Configuration
 */
module.exports = (env) => {
  const isDev = !(env && env.prod);
  const devtool = isDev ? "eval" : "source-map";

  return {
    devtool: devtool,

    context: __dirname,

    entry: {
      app: [
        "js/app.js"
      ]
    },

    output: {
      path: path.resolve(__dirname, "../priv/static"),
      filename: "js/[name].js"
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          query: {
            presets: ["env"]
          }
        }
      ]
    },

    resolve: {
      modules: ["node_modules", __dirname],
      extensions: [".js"]
    },

    plugins: [
      new CopyWebpackPlugin([{
        from: "./static",
        to: path.resolve(__dirname, "../priv/static")
      }])
    ]
  }
}
