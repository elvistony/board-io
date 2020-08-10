//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path')
module.exports = {
  entry:{
    app:'./src/app.js'
  },
  output:{
    filename:'app.bundle.js',
    path : path.resolve(__dirname,'build'),
    chunkFilename:"[name].js"
  },
  target: 'web',

  mode:'production',
  optimization: {
    splitChunks:{
      cacheGroups:{
        vendors:{
          test: /[\\/]node_modules[\\/]/,
          name:'vendor',
          chunks:'initial'
        }
      }
    }
  },
  devtool: false,
  //plugins:[ new BundleAnalyzerPlugin()]
}
