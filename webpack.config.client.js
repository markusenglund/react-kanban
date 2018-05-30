const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const CleanPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ZopfliPlugin = require("zopfli-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
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
        test: /\.(png|gif)$/,
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
        test: /\.jpg$/,
        use: {
          loader: "responsive-loader",
          options: {
            name: "images/[name]-[width].[hash:6].[ext]",
            placeholder: true,
            quality: 60
          }
        }
      },
      {
        test: /\.webp$/,
        use: [
          {
            loader: "file-loader",
            options: {
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
    new DashboardPlugin(),
    new ManifestPlugin(),
    new MiniCssExtractPlugin(),
    // new ZopfliPlugin(),
    // new BrotliPlugin(),
    new UglifyPlugin({
      uglifyOptions: {
        output: {
          comments: false
        }
      }
    })
  ],
  resolve: {
    extensions: [".js", ".jsx"]
  }
};
