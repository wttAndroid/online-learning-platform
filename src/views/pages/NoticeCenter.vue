<template>
  <div class="notice">
    <div class="center-content">
      <router-view></router-view>

      <!-- <div class="notice-top-box clearfix">
        <div class="fl">
          <i class="iconfont icon-back"></i>
          <span class="notice-title-text">通知公告</span>
        </div>
        <div class="fr">
          <el-button
            icon="el-icon-arrow-left "
            @click="$router.go(-1)"
            size="small"
            circle
          ></el-button>
        </div>
      </div>
      <div class="msg-content-box">
        <router-view></router-view>
      </div> -->
    </div>
  </div>
</template>

<style lang="scss">
.notice {
  width: 100%;
  background-color: #f1f5f8;
  overflow: hidden;
  padding-bottom: 80px;
  .center-content {
    height: 100%;
    min-height: 800px;
    padding-top: 20px;
  }
}

.notice-top-box {
  padding: 30px 40px 22px 14px;
  line-height: 42px;
  .notice-title-text {
    color: #303133;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 2px;
  }
}
.content-box {
  background-color: #fff;
  border-radius: 6px;
  min-height: 500px;
}
</style>
