const { name } = require('./package')

module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? '/subapp/' : '/',
  devServer: {
    port: 8080, // 确保与主应用 entry 配置一致
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      chunkLoadingGlobal: `webpackJsonp_${name}` // webpack 5 需要把 jsonpFunction 替换成 chunkLoadingGlobal
    }
  }
}
