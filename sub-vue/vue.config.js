const { name } = require('../package.json')

module.exports = {
  publicPath: '/subapp/sub-vue',
  transpileDependencies: ['common'],
  chainWebpack: config => config.resolve.symlinks(false),
  configureWebpack: {
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: 'umd', // js打包成umd格式，可以直接解析js，直接拿window上的钩子函数进行使用
      jsonpFunction: `webpackJsonp_${name}`
    }
  },
  devServer: {
    port: process.env.VUE_APP_PORT,
    headers: {
      'Access-Control-Allow-Origin': '*' // 基座加载时fetch会跨域
    }
  }
}
