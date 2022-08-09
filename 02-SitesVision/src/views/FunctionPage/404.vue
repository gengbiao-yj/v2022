<script setup>
const year = ref(new Date().getFullYear());
const router = useRouter();
</script>
<template>
  <div class="root-404">
    <div>
      <span>您访问的页面不存在</span>
      <el-button size="mini" type="primary" @click="router.go(-1)"
        >返回</el-button
      >
    </div>
    <div>
      <span>Copyright© SitesVision X {{ year }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseNone'
};
</script>

<style lang="scss" scoped>
.root-404 {
  width: 100%;
  height: 100%;
  background-color: #f1f1f1;
  //overflow: hidden;
  background-image: url('../../../public/resource/imgs/404.png');
  background-size: 80%;
  background-position: 45%, 0%;
  background-repeat: no-repeat;
  position: relative;
  > div:nth-child(1) {
    position: absolute;
    bottom: 60px;
    height: 55px;
    width: 100%;
    @include flex(column, space-between, center);
    > span {
      font-size: 15px;
    }
    &::v-deep {
      .el-button {
        padding: 0px 20px !important;
        height: 22px;
        font-size: 13px;
      }
    }
  }
  > div:nth-child(2) {
    width: 98vw;
    height: 40px;
    position: absolute;
    bottom: 10px;
    left: 1vw;
    background: white;
    border-radius: 5px;
    border: 1px dashed #d0d0d0;
    @include flex(row, center, center);
    font-size: 13px;
    color: #333;
  }
}
</style>
