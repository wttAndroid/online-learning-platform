<template>
  <div class="msg">
    <div class="notice-top-box clearfix">
      <div class="fl">
        <i class="iconfont icon-back"></i>
        <span class="notice-title-text">我的作业</span>
      </div>
      <div class="fr">
        <el-button
          icon="el-icon-arrow-left "
          @click="$router.go(-1)"
          size="small"
          circle
        ></el-button>
        返回
      </div>
    </div>
    <div class="content-box">
      <!-- <None /> -->
    </div>
  </div>
</template>
<script>
import None from "@/components/common/no-databox.vue";
export default {
  data() {
    return {};
  },
  components: {
    None,
  },
};
</script>
<style lang="scss" scoped>
.msg {
  text-align: center;
  min-height: 300px;
  width: 100%;
  display: table;
}
</style>
