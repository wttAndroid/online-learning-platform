<template>
  <div class="common-no_data-box">
    <div class="common-no_data-content">
      <i class="common-no_data-icon"></i>
      <p class="common-no_data-tips">{{ tips }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tips: {
      type: String,
      default: "暂无数据",
    },
  },
};
</script>


<style lang="scss" scoped>
.common-no_data-box {
  text-align: center;
  min-height: 300px;
  width: 100%;
  display: table;
  height: 500px;
  .common-no_data-content {
    display: table-cell;
    vertical-align: middle;
    .common-no_data-icon {
      display: inline-block;
      vertical-align: top;
      width: 170px;
      height: 170px;
      background-image: url("../../assets/iconfont/none.png");
      background-repeat: no-repeat;
      background-size: cover;
    }
    .common-no_data-tips {
      font-size: 16px;
      color: #606266;
      letter-spacing: 2px;
      line-height: 22px;
      padding-top: 35px;
      text-align: center;
    }
  }
}
</style>
