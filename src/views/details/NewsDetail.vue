<template>
  <div class="news">
    <div class="center-content">
      <div class="newsDetail">
        <h2 class="title">
          {{ AfficheInfo.title }}
        </h2>
        <div class="time">
          <span>{{ AfficheInfo.author }}</span
          ><span>{{ AfficheInfo.createTime }}</span>
        </div>
        <div class="content" v-html="AfficheInfo.content">
          {{ AfficheInfo.content }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import eduApi from "@/api/edu.js";
export default {
  data() {
    return {
      AfficheInfo: {},
    };
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.getAfficheDetail(this.$route.params.id);
    }
  },
  methods: {
    getAfficheDetail(id) {
      eduApi.getAffichebyId(id).then((res) => {
        if (res.code == 20000) {
          this.AfficheInfo = res.data.item;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.news {
  width: 100%;
  background-color: #f5f7fa;
  overflow: hidden;
  padding-bottom: 80px;
  padding: 21px 0;
  min-height: 800px;
}
.newsDetail {
  min-height: 800px;
  background: #fff;
  padding: 34px;
  text-align: center;
  .title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 14px;
  }
  .time {
    color: #909399;
    font-size: 14px;
    span {
      color: #909399;
      font-size: 14px;
      margin-right: 10px;
    }
  }
  .content {
    margin-top: 50px;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    letter-spacing: 1px;
    text-align: left;
    text-indent: 25px;
  }
}
</style>
