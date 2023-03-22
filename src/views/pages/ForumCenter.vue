<template>
  <div class="forum">
    <div class="center-content clearfix">
      <div class="fl content-left-box">
        <router-view></router-view>
      </div>

      <div class="fr content-right-box">
        <el-button
          style="width: 100%; margin-bottom: 20px"
          icon="el-icon-s-promotion"
          type="danger"
          plain
          @click="goPublicAcl()"
          >发布内容</el-button
        >
        <div class="forum-hot">
          <div class="hot-title">
            <i class="el-icon el-icon-s-data"></i><span>热帖排行</span>
          </div>
          <div class="hot-post-box">
            <li
              v-for="item in hotList"
              :key="item.artId"
              @click="$router.push(`/forumCenter/detail/${item.artId}`)"
            >
              <div class="com-post-box-title">
                <a>{{ item.title }}</a>
              </div>
              <div class="reply-item">
                <span>{{ item.hot }}回复</span
                ><span>{{ item.createTime }}</span>
              </div>
            </li>
          </div>
        </div>

        <div class="forum-hot">
          <div class="hot-title">
            <i class="el-icon el-icon-s-flag"></i><span>热门话题</span>
          </div>
          <div class="hot-post-box">
            <li v-for="item in hotTagList" :key="item.tagId">
              <div class="gambit-title">
                <a>#{{ item.name }}#</a>
              </div>
              <b>{{ item.hot }}篇参与</b>
            </li>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eduApi from "@/api/edu.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      hotList: [],
      hotTagList: [],
    };
  },
  created() {
    this.getAclhotList();
    this.getAclTaghotList();
  },
  computed: {
    ...mapState({ userInfo: (state) => state.user }),
  },
  methods: {
    goPublicAcl() {
      if (!this.userInfo.token) {
        this.$store.dispatch("dialog/setlogin", true);
        return this.$message.error("请登录后再操作！");
      }
      this.$router.push("/askrelease");
    },
    getAclhotList() {
      eduApi.getAclhotList().then((res) => {
        if (res.code == 20000) {
          this.hotList = res.data.items;
        }
      });
    },
    getAclTaghotList() {
      eduApi.getAclTaghotList().then((res) => {
        if (res.code == 20000) {
          this.hotTagList = res.data.items;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.forum {
  width: 100%;
  background-color: #f7f7f7;
  overflow: hidden;
  padding-bottom: 80px;
  .center-content {
    height: 100%;
    background: #f7f7f7;
    min-height: 800px;
    padding-top: 20px;
  }
}
.content-left-box {
  width: 880px;
  margin-bottom: 20px;
  .forum-box {
    padding: 20px 30px;
    background: #fff;
    border-radius: 10px;
    position: relative;
    .forum-box-ul {
      .forum-tab-content {
        .forum-content-item {
          width: 100%;
          border-bottom: 1px solid #ededed;
          padding: 22px 0;
          letter-spacing: normal;
          .forum-item-title {
            .community-sign {
              display: inline-block;
              width: 42px;
              height: 20px;
              line-height: 20px;
              font-size: 12px;
              font-weight: 400;
              color: #fff;
              border-radius: 10px;
              text-align: center;
              background: $theme-color-icon2;
              margin-right: 10px;
            }
            .community-sign-essence {
              display: inline-block;
              width: 42px;
              height: 20px;
              line-height: 20px;
              font-size: 12px;
              font-weight: 400;
              color: #fff;
              border-radius: 10px;
              text-align: center;
              background: $theme-color-icon;
              margin-right: 10px;
            }
            .title-text {
              font-size: 16px;
              color: #333;
              line-height: 21px;
              max-width: 450px;
              margin-right: 20px px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
              font-weight: 700;
            }
            .topic-t {
              margin-right: 12px;
              line-height: 20px;
              float: left;
              font-size: 14px;
              font-weight: 400;
              color: #ff9e3f;
              cursor: pointer;
            }
          }
          .forum-item-text {
            font-weight: 400;
            margin: 16px 0 26px;
            color: #888;
            line-height: 22px;
            font-size: 14px;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .forum-item-info {
            .forum-item-tag {
              .icon-box {
                margin-right: 20px;
                color: #e2e2e2;
              }
            }
            .forum-text-date {
              line-height: 26px;
              color: #999;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
.content-right-box {
  width: 290px;
  .forum-hot {
    background: #fff;
    margin-bottom: 20px;
    border-radius: 8px;
    padding: 0 30px;
    overflow: hidden;
    .hot-title {
      width: 100%;
      height: 57px;
      line-height: 63px;
      border-bottom: 1px solid #f4f4f4;
      font-size: 16px;
      font-weight: 700;
      color: #333;
      margin-bottom: 18px;
      .el-icon {
        line-height: 62px;
        font-size: 18px;
        color: $theme-color-icon;
        margin-right: 10px;
        float: left;
        font-weight: 400;
      }
    }
    .hot-post-box {
      li {
        width: 100%;
        margin-bottom: 24px;
        font-weight: 400;
      }
      .com-post-box-title {
        width: 100%;
        max-height: 40px;
        font-size: 14px;
        line-height: 22px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        line-clamp: 2;
        cursor: pointer;
        box-orient: vertical;
      }
      .gambit-title {
        display: inline-block;
        width: 57%;
        font-size: 14px;
        vertical-align: top;
        cursor: pointer;
      }
      b {
        float: right;
        font-weight: 400;
        color: #c3c3c3;
        font-size: 12px;
      }
      .reply-item {
        color: #c3c3c3;
        font-size: 12px;
        padding-top: 15px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        span {
          color: #c3c3c3;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
