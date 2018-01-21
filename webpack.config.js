const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");
const nodeExternals = require("webpack-node-externals");
const autoprefixer = require("autoprefixer");

module.exports = [
  {
    name: "client",
    target: "web",
    entry: path.join(__dirname, "src/client.jsx"),
    output: {
      path: path.join(__dirname, "dist/public"),
      publicPath: "/public/",
      filename: "bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: {
            loader: "babel-loader"
          },
          exclude: /node_modules/
        },
        {
          test: /\.(css|scss)$/,
          use: ExtractTextPlugin.extract([
            {
              loader: "css-loader",
              options: {
                importLoaders: 1
              }
            },
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: [autoprefixer()]
              }
            },
            {
              loader: "sass-loader"
            }
          ])
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "assets/"
              }
            },
            {
              loader: "image-webpack-loader"
            }
          ]
        }
      ]
    },
    plugins: [new ExtractTextPlugin("bundle.css"), new DashboardPlugin()],
    resolve: {
      extensions: [".js", ".jsx"]
    }
  },
  {
    name: "server",
    target: "node",
    externals: [nodeExternals()],
    entry: path.join(__dirname, "src/server/server.js"),
    output: {
      path: path.join(__dirname, "dist"),
      filename: "server.js",
      libraryTarget: "commonjs2"
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: {
            loader: "babel-loader"
          },
          exclude: /node_modules/
        },
        {
          test: /\.(css|scss)$/,
          loader: "ignore-loader"
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                emitFile: false,
                name: "[name].[ext]",
                publicPath: "/public/",
                outputPath: "assets/"
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: [".js", ".jsx"]
    }
  }
];
