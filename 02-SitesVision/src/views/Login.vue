<template>
  <div class="login-root">
    <div class="content-box">
      <div class="left-box">
        <div class="slogan-title">
          拥抱大数据，充分结合人工智能
          <p class="large">高效解决选址问题</p>
        </div>
      </div>
      <div class="right-box"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseLogin'
};
</script>

<style lang="scss" scoped>
.login-root {
  background: #e3f2ff;
  @include box-size(100vw, 100vh);

  .content-box {
    @include abs-position(true);
    text-align: center;
    max-height: 80%;
    overflow: hidden;
    padding: 14px;
    transform-origin: 0 0;
    background: #fff;
    box-shadow: 0 15px 19px 0 rgb(12 52 107 / 6%);
    border-radius: 16px;

    & > div {
      display: inline-block;
      @include box-size(50%, 100%);
    }

    .left-box {
      border-radius: 16px;
      overflow: hidden;
      background: {
        image: url('../../public/resource/imgs/loginCard.png');
        repeat: no-repeat;
        size: 100% auto;
        position: 50%;
      }

      .slogan-title {
        position: absolute;
        top: 12%;
        width: 50%;
        text-align: center;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #fff;

        .large {
          letter-spacing: 3px;
          margin-top: 10px;
        }
      }
    }
  }
}

/*  媒体查询
------------------------------------------------ */
@media screen and (max-width: 1920px) {
  .content-box {
    @include box-size(1100px, 682px);
  }

  .slogan-title {
    font-size: 26px;

    .large {
      letter-spacing: 6px;
      font-size: 40px;
      margin-top: 8px;
    }
  }
}
</style>
