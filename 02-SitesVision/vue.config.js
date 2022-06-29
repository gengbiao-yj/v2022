const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');

const port = '50000'; // 设置端口
const config = defineConfig({
  transpileDependencies: true,
  outputDir: `dist_${process.env.NODE_ENV}`, // 设置不同环境的打包输出地址
  chainWebpack: config => {
    /*  element plus CSS按需引入
    ------------------------------------------------ */
    config
      .plugin('AutoImport')
      .use(AutoImport({ resolvers: [ElementPlusResolver()] }));
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
    } // 热编译完成自动打开浏览器
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
        path.resolve(__dirname, './src/assets/scss/global.scss')
      ]
    }
  }
});
module.exports = config;
