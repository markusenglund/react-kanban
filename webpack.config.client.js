const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const CleanPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const UglifyPlugin = require("uglifyjs-webpack-plugin");
const autoprefixer = require("autoprefixer");

module.exports = {
  name: "client",
  target: "web",
  entry: "./src/client.jsx",
  output: {
    path: path.join(__dirname, "dist/public"),
    publicPath: "/static/",
    filename: "bundle.[hash:6].js"
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
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              minimize: true
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
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 4096,
              name: "[name].[hash:6].[ext]",
              outputPath: "images/"
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: {
          loader: "svg-url-loader",
          options: {
            noquotes: true,
            limit: 4096,
            name: "[name].[hash:6].[ext]",
            outputPath: "images/"
          }
        }
      }
    ]
  },
  plugins: [
    new CleanPlugin(["dist"]),
    new CopyPlugin([{ from: "src/assets/favicons", to: "favicons" }]),
    new ManifestPlugin(),
    new MiniCssExtractPlugin(),
    new CompressionPlugin(),
    new UglifyPlugin({
      uglifyOptions: {
        output: {
          comments: false
        },
        compress: {
          drop_console: true
        }
      }
    })
  ],
  resolve: {
    extensions: [".js", ".jsx"]
  }
};
