import webpack from 'webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import _debug from 'debug'
import config, { paths } from './config'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

const { __DEV__, __PROD__ } = config.globals

const debug = _debug('plato:webpack')

debug('Create configuration.')

var cssLoader = {
  loader: 'css-loader',
  options: {
    minimize: __PROD__,
    sourceMap: __DEV__
  }
}

// generate loader string to be used with extract text plugin
function generateLoaders (loader, loaderOptions) {
  var loaders = [cssLoader]
  if (loader) {
    loaders.push({
      loader: loader + '-loader',
      options: Object.assign({}, loaderOptions, {
        sourceMap: __DEV__
      })
    })
  }

  // Extract CSS when that option is specified
  // (which is the case during production build)
  if (__PROD__) {
    return ExtractTextPlugin.extract({
      use: loaders,
      fallback: 'vue-style-loader'
    })
  } else {
    return ['vue-style-loader'].concat(loaders)
  }
}

const webpackConfig = {
  target: 'web',
  resolve: {
    modules: [paths.src(), 'node_modules'],
    extensions: ['.css', '.js', '.json', '.vue'],
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  externals: {
    jquery: 'window.$'
  },
  node: {
    fs: 'empty',
    net: 'empty'
  },
  devtool: config.compiler_devtool,
  devServer: {
    host: config.server_host,
    port: config.server_port,
    disableHostCheck: true,
    compress: true,
    hot: true,
    noInfo: true
  },
  entry: {
    app: [paths.src('polyfills/index.js'), paths.src('index.js')]
  },
  output: {
    path: paths.dist(),
    publicPath: config.compiler_public_path,
    filename: `[name].[${config.compiler_hash_type}].js`,
    chunkFilename: `[id].[${config.compiler_hash_type}].js`
  },
  performance: {
    hints: __PROD__ ? 'warning' : false
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: __DEV__,
          formatter: require('eslint-friendly-formatter')
        },
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: __PROD__ ? ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'vue-style-loader'
            }) : 'vue-style-loader!css-loader',
            js: 'babel-loader'
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader?strictMath&noIeCompat'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.html$/,
        loader: 'vue-html-loader'
      },
      {
        test: /@[1-3]x\S*\.(png|jpg|gif)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash:7]'
        }
      },
      {
        test: /\.(png|jpg|gif|svg|woff2?|eot|ttf)(\?.*)?$/,
        exclude: /@[1-3]x/, // skip encoding @1x/@2x/@3x images with base64
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash:7]'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(config.globals),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: paths.src('index.ejs'),
      hash: false,
      inject: true,
      minify: {
        collapseWhitespace: config.compiler_html_minify,
        minifyJS: config.compiler_html_minify,
        removeComments: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    new CopyWebpackPlugin(
      [
        {
          from: paths.src('static')
        }
      ],
      {
        ignore: ['README.md']
      }
    ),
    new webpack.ContextReplacementPlugin(
      /moment[\\\/]locale$/,
      /^\.\/(zh-cn)$/
    )
  ]
}

// ------------------------------------
// Plugins
// ------------------------------------

const vueLoaderOptions = {
  less: generateLoaders('less'),
  postcss: pack => {
    return [
      require('postcss-import')({
        path: paths.src('application/styles')
      }),
      require('postcss-url')({
        basePath: paths.src('static')
      }),
      require('postcss-cssnext')({
        // see: https://github.com/ai/browserslist#queries
        browsers: 'Android >= 4, iOS >= 7, not ie <= 8',
        features: {
          customProperties: {
          }
        }
      }),
      require('postcss-flexible')({
        remUnit: 75
      }),
      require('postcss-browser-reporter')(),
      require('postcss-reporter')()
    ]
  },
  autoprefixer: true
}

if (__PROD__) {
  debug('Enable plugins for production (Dedupe & UglifyJS).')
  webpackConfig.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      options: {
        context: __dirname
      },
      vue: vueLoaderOptions
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      },
      sourceMap: false
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      // allChunks: true,
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            paths.base('node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),
    new BundleAnalyzerPlugin({
      analyzerPort: 8889
    })
  )
} else {
  debug('Enable plugins for live development (HMR, NoErrors).')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
        context: __dirname
      },
      vue: vueLoaderOptions
    })
  )
}

export default webpackConfig
