module.exports = {
  transpileDependencies: ['common'],
  chainWebpack: config => {
    config.plugin('html')
      .tap((args) => {
        args[0].title = '乾坤示例'
        return args
      })
  },
  devServer: {
    port: 8888
  }
}
