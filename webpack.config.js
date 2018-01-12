const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    "babel-polyfill",
    "./ui/src/index.js"
  ],
  output: {
    path: path.join(__dirname, '/ui/'),
    filename: 'gittoken-ui.dist.js',
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          plugins: ['transform-runtime'],
          presets: ['env', 'react', 'stage-0']
        }
      }, {
        test : /.json?$/,
        loader : "json-loader"
      },{
        test: /\.worker\.js$/,
        use: {
          loader: 'worker-loader'
        }
      },{
        // test: /\.(woff2|woff|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        test: /\.(woff2|woff|ttf|eot|svg)(\?.*$|$)/,
        loader: 'file-loader?name=fonts/[name].[ext]',
        include: [
          path.join(process.cwd(), 'ui/src'),
          path.join(process.cwd(), 'node_modules'),
        ],
      }
    ]
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"development"'
    })
  ]
}
