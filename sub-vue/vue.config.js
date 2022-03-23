const { name } = require('./package.json')
// 子应用`devServer`端口修改,跨域`headers`和`output`配置 
module.exports = {
  publicPath: '/subapp/sub-vue',
  transpileDependencies: ['common'], // 由于common是不经过babel和pollfy的，所以引用者需要在webpack打包时「显性指定该模块需要编译」
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
