const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const customPath = path.join(__dirname, "./customPublicPath");

module.exports = {
  node: {
    dns: "empty",
    net: "empty"
  },
  entry: {
    create_styleurl: [
      customPath,
      path.join(__dirname, "../chrome/extension/create_styleurl")
    ],
    view_styleurl: [
      customPath,
      path.join(__dirname, "../chrome/extension/create_styleurl")
    ],
    inject_create_styleurl: [
      customPath,
      path.join(__dirname, "../chrome/extension/inject_create_styleurl")
    ],
    inject_view_styleurl: [
      customPath,
      path.join(__dirname, "../chrome/extension/inject_view_styleurl")
    ],
    background: [
      customPath,
      path.join(__dirname, "../chrome/extension/background")
    ],
    devtools: [
      customPath,
      path.join(__dirname, "../chrome/extension/devtools")
    ],
    github_gist_content_script: [
      customPath,
      path.join(__dirname, "../chrome/extension/github_gist_content_script")
    ]
  },
  output: {
    path: path.join(__dirname, "../build"),
    filename: "[name].bundle.js",
    chunkFilename: "[id].chunk.js"
  },
  optimization: {
    minimize: false,
    nodeEnv: "production"
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.IgnorePlugin(/[^/]+\/[\S]+.dev$/),
    new webpack.DefinePlugin({
      __API_HOST__: "`https://api.styleurl.app`",
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  resolve: {
    extensions: ["*", ".js"],
    alias: {
      fs: "memfs"
    }
  },
  module: {
    rules: [
      {
        test: /\.ttf$/,
        use: {
          loader: "file-loader"
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: ["@babel/plugin-proposal-class-properties", "lodash"],
            presets: [
              "@babel/preset-react",
              [
                "@babel/preset-env",
                {
                  targets: {
                    browsers: ["last 2 Chrome versions"]
                  }
                }
              ]
            ],
            babelrc: false
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          { loader: "css-loader", options: { importLoaders: 1 } },
          {
            loader: "postcss-loader",
            options: {
              exclude: /(node_modules|bower_components)/
            }
          }
        ]
      }
    ]
  }
};
