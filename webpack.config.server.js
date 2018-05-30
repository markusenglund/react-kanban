const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  name: "server",
  target: "node",
  externals: [nodeExternals()],
  entry: "./src/server/server.js",
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
        test: /\.(png|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              emitFile: false,
              limit: 4096,
              name: "[name].[hash:6].[ext]",
              publicPath: "/static/images/"
            }
          }
        ]
      },
      {
        test: /\.jpg$/,
        use: {
          loader: "responsive-loader",
          options: {
            name: "/static/images/[name]-[width].[hash:6].[ext]",
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
              emitFile: false,
              name: "[name].[hash:6].[ext]",
              outputPath: "/static/images/"
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
            emitFile: false,
            limit: 4096,
            name: "[name].[hash:6].[ext]",
            outputPath: "images/"
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  }
};
