const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
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
              loader: "url-loader",
              options: {
                limit: 4096,
                name: "[name].[ext]",
                outputPath: "images/"
              }
            },
            {
              loader: "image-webpack-loader"
            }
          ]
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin("bundle.css"),
      new CopyWebpackPlugin([{ from: "src/assets/favicons", to: "favicons" }]),
      new DashboardPlugin()
    ],
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
              loader: "url-loader",
              options: {
                emitFile: false,
                limit: 4096,
                name: "[name].[ext]",
                outputPath: "images/",
                publicPath: "/public/"
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
