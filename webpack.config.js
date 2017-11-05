var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: __dirname + '/public/index.html',
  filename: 'index.html',
  inject: 'body'
})
var path = require('path');

module.exports = {

    entry: __dirname + '/src/index.js',
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    plugins: [HTMLWebpackPluginConfig],
    devServer: {
      proxy: {
        "/api/**": {
        target: "http://localhost:4000",
        pathRewrite: {
                    "^/api": ""
                }
      }
    }
  }
};
