const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir:`dist_${process.env.NODE_ENV}`, // 设置不同环境的打包输出地址
});
