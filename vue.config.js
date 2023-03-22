const path=require("path")

module.exports = {
  devServer: {
    port:8002
  },
  configureWebpack:{
    resolve:{
      alias:{
        "assets":"@/assets",
      }
    }
  },
  css: { // ----------------------------------- 全局引入公共样式文件
    loaderOptions: {
      scss: {
        // 全局sass变量 
        //sass-loader 8.0.0以前版本 , v8 - prependData, v10+ - additionalData 
        prependData : `@import "@/assets/css/common.scss";`
      }
    }
  }
  // pluginOptions: {
  //   'style-resources-loader': {
  //     preProcessor: 'less',
  //     patterns: [path.resolve(__dirname,'./src/assets/css/common.less')]
  //   }
  // }
}
