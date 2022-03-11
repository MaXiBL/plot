const path = require('path')
 
function resolve(dir) {
  return path.join(__dirname, dir)
}
 
const name = 'vue project' // page title
// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
const port = 8081 // dev port
const HtmlWebpackPlugin = require('html-webpack-plugin') // 引入CDN配置插件
const cdn = {
  // 开发环境
  dev: {
    css: [
 
    ],
    js: [
 
    ]
  },
  // 生产环境 配置对应CDN地址
  build: {
    css: [
      // 'https://cdn.bootcdn.net/ajax/libs/element-ui/2.5.4/theme-chalk/index.css'
    ],
    js: [
      // 'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
      // 'https://cdn.bootcss.com/vue-router/3.0.6/vue-router.min.js',
      // 'https://cdn.bootcss.com/vuex/3.1.0/vuex.min.js',
      // 'https://cdn.bootcss.com/axios/0.19.0/axios.min.js',
    //   'https://cdn.bootcdn.net/ajax/libs/moment.js/2.23.0/moment.min.js',
    //   'https://cdn.bootcdn.net/ajax/libs/echarts/4.2.1/echarts.min.js'
    ]
  }
}
// elementUI
// const Components = require('unplugin-vue-components/webpack')
// const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  // 205 || 生产
  // publicPath: '/web/vue/',
  runtimeCompiler: true, // 运行时报错配置
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  // eslint-loader是否在保存的时候检查
  lintOnSave: false,
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // 跨域代理
    // proxy: {
    //   "/api": {
    //     target: 'http://192',
    //     changeOrigin: true, // 是否改变域名
    //     ws: true
    //     // pathRewrite: {
    //     //   // 路径重写
    //     //   "/api": "" // 这个意思就是以api开头的，定向到哪里, 如果你的后边还有路径的话， 会自动拼接上
    //     // }
    //   }
    // }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('./src'),
        'assets': resolve('./src/assets'),
        'style': resolve('./src/style')
      }
    }
  },
  chainWebpack: config => {
      // plugins: [
      //   Components({
      //     resolvers: [ElementPlusResolver()],
      //   }),
      // ],
      // config.entry.app = ['babel-polyfill', './src/main.js'];
      config.plugins.delete("preload"); // TODO: need test
      config.plugins.delete("prefetch"); // TODO: need test
 
      // 对vue-cli内部的 webpack 配置进行更细粒度的修改
      config.plugin('html').tap(args => {
        if (process.env.NODE_ENV === 'production') {
            args[0].cdn = cdn.build
        }
        if (process.env.NODE_ENV === 'development') {
            args[0].cdn = cdn.dev
        }
        return args
    })
 
      // set svg-sprite-loader
      // config.entry('main').add('babel-polyfill');
      config.module
      .rule('iview')
      .test(/iview.src.*?js$/)
      .use('babel')
        .loader('babel-loader')
        .end();
 
      config.module
        .rule("svg")
        .exclude.add(resolve("src/icons"))
        .end();
      config.module
        .rule("icons")
        .test(/\.svg$/)
        .include.add(resolve("src/icons"))
        .end()
        .use("svg-sprite-loader")
        .loader("svg-sprite-loader")
        .options({
          symbolId: "icon-[name]"
        })
        .end();
        config.optimization.splitChunks({
          chunks: "all",
          cacheGroups: {
            libs: {
              name: "chunk-libs",
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: "initial" // only package third parties that are initially dependent
            },
            // elementUI: {
            //   name: "chunk-elementUI", // 将elementUI拆分成一个包
            //   priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            //   test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // 以适应cnpm
            // },
            commons: {
              name: "chunk-commons",
              test: resolve("src/components"), // 可以自定义规则
              minChunks: 3, //  minimum common number
              priority: 5,
              reuseExistingChunk: true
            }
          }
        });
        config.optimization.runtimeChunk("single");
      
  }
}