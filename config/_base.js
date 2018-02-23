import { resolve } from 'path'
import _debug from 'debug'

const debug = _debug('nvadmin:config:base')

const config = {
  env: process.env.NODE_ENV || 'development',

  pkg: require('../package.json'),

  // ----------------------------------
  // Theme Configuration
  // ----------------------------------
  theme: 'default',

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base: resolve(__dirname, '../'),
  dir_src: 'src',
  // dir_dist: 'dist',
  dir_dist: 'docs',
  dir_test: 'test',

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host: '0.0.0.0', // binds to all hosts
  server_port: process.env.PORT || 5003,

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_devtool: 'source-map',
  compiler_hash_type: 'hash',
  compiler_html_minify: false,
  compiler_public_path: ''
}

// ------------------------------------
// Environment
// ------------------------------------
config.globals = {
  __DEV__: config.env === 'development',
  __PROD__: config.env === 'production',
  __TEST__: config.env === 'test'
}

// ------------------------------------
// Utilities
// ------------------------------------
config.paths = (() => {
  const base = (...args) =>
    resolve.apply(resolve, [config.path_base, ...args])

  return {
    base,
    src: base.bind(null, config.dir_src),
    dist: base.bind(null, config.dir_dist),
    test: base.bind(null, config.dir_test)
  }
})()

export default config
