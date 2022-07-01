const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');

const port = '50000'; // 设置端口
const config = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  outputDir: `dist_${process.env.NODE_ENV}`, // 设置不同环境的打包输出地址
  chainWebpack: config => {
    config.plugin('AutoImport').use(
      AutoImport({
        /*  element plus 按需引入
        ------------------------------------------------ */
        resolvers: [ElementPlusResolver()],
        /*  vue Api 全局引入
        ------------------------------------------------ */
        imports: ['vue', 'vue-router'],
        // 解决 vue api 全局引入后 eslint报错问题
        eslintrc: {
          enabled: true
        }
      })
    );
    config
      .plugin('Components')
      .use(Components({ resolvers: [ElementPlusResolver()] }));
    /*  标题
    ------------------------------------------------ */
    // config.plugin('html').tap(args => {
    //   args[0].title = '主页';
    //   return args;
    // });
  },
  devServer: {
    client: {
      progress: true
    },
    port,
    open: {
      target: `http://localhost:${port}/`
    }, // 热编译完成自动打开浏览器
    proxy: {
      '/uatProxy': {
        target: 'http://222.71.8.115:58089/api',
        pathRewrite: { '^/uatProxy': '' }
        // ws: true, //用于支持websocket
        // changeOrigin: true //用于控制请求头中的host值
      },
      '/prodProxy': {
        target: 'http://pt.rls.com.cn:28089/api',
        pathRewrite: { '^/prodProxy': '' }
      }
    }
  },
  configureWebpack: {
    resolve: {
      /*  路径别名设置
      ------------------------------------------------ */
      alias: {
        _components: '@/components',
        _assets: '@/assets',
        _views: '@/views',
        _store: '@/store'
      }
    }
  },
  pluginOptions: {
    /*  复制 ./src/assets/scss/global.scss文件，到每个vue组件文件中
    ------------------------------------------------ */
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        // 绝对路径,不能使用 alias 中配置的别名路径，如@表示的src
        path.resolve(__dirname, './src/scss/global.scss')
      ]
    }
  }
});
module.exports = config;
