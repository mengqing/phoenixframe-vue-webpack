/**
 * Modules
 */
const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");

/**
 * Configuration
 */
module.exports = (env) => {
  return {
    context: __dirname,

    entry: {
      app: [
        "js/app.js",
        "css/app.css"
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
        },

        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          exclude: /node_modules/,
          loaders: [
            "file-loader?name=images/[name].[ext]",
            {
              loader: "image-webpack-loader",
              options: {
                query: {
                  mozjpeg: {
                    progressive: true
                  },
                  gifsicle: {
                    interlaced: true
                  },
                  optipng: {
                    optimizationLevel: 7
                  },
                  pngquant: {
                    quality: "65-90",
                    speed: 4
                  }
                }
              }
            }
          ]
        },

        {
          test: /\.(ttf|woff2?|eot|svg)$/,
          exclude: /node_modules/,
          query: { name: "fonts/[hash].[ext]" },
          loader: "file-loader"
        },

        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: ExtractTextWebpackPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader", "postcss-loader"]
          })
        },

        {
          test: /\.vue$/,
          loader: "vue-loader"
        }
      ]
    },

    resolve: {
      modules: ["node_modules", __dirname],
      extensions: [".js", ".css", ".vue"],
      alias: {
        vue: "vue/dist/vue.js"
      }
    },

    plugins: [
      new CopyWebpackPlugin([{
        from: "./static",
        to: path.resolve(__dirname, "../priv/static")
      }]),

      new ExtractTextWebpackPlugin({
        filename: "css/[name].css",
        allChunks: true
      })
    ]
  }
}
