<template>
  <div class="learn">
    <div class="center-content clearfix">
      <div class="learn-content">
        <header class="clearfix">
          <div class="user-info" v-if="userInfo.token">
            <div class="user-info-avater">
              <img :src="userInfo.user.userHead" alt="" />
            </div>
            <div class="user-info-content">
              <p class="className">您好，{{ userInfo.user.userName }}！</p>
            </div>
          </div>
          <div class="user-info" v-else>
            <div class="user-info-avater">
              <img src="@/assets/img/student.jpg" alt="" />
            </div>
            <div class="user-info-content">
              <p class="className">同学您好，请先登录</p>
            </div>
          </div>

          <div class="user-nav">
            <div class="user-nav-item" @click="$router.push('/notice/msg')">
              <div class="nav-item-img item">
                <img src="../../assets/img/tongzhi.png" alt="" />
              </div>
              <p>我的通知</p>
            </div>
            <div class="user-nav-item" @click="$router.push('/notice/exam')">
              <div class="nav-item-img item">
                <img src="../../assets/img/zuoye.png" alt="" />
              </div>
              <p>我的作业</p>
            </div>
            <!-- <div
              class="user-nav-item"
              @click="$router.push('/notice/Busywork')"
            >
              <div class="nav-item-img item">
                <img src="../../assets/img/kaoshi.png" alt="" />
              </div>
              <p>我的考试</p>
            </div> -->
          </div>
        </header>
        <div class="class-content">
          <div class="class-head">
            <span class="active">在学课程</span>
          </div>
          <div class="class-ctx clearfix">
            <None v-if="!classList || !classList.length" />
            <div
              v-else
              class="class-item"
              v-for="(item, index) in classList"
              :key="index"
              @click="$router.push(`/courseDetail?id=${item.courseId}`)"
            >
              <img :src="item.cover" alt="" />
              <p>{{ item.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import edu from "@/api/edu.js";
import { mapActions, mapState } from "vuex";
import None from "@/components/common/no-databox.vue";
export default {
  data() {
    return {
      isLogin: true,
      courseActive: 1,
      classList: [],
    };
  },
  components: {
    None,
  },
  computed: {
    ...mapState({ userInfo: (state) => state.user }),
  },
  mounted() {
    edu.getCourseByList().then((res) => {
      if (res.code == 20000) {
        this.classList = res.data.items;
      }
    });
  },
  methods: {},
};
</script>


<style lang="scss" scoped>
.learn {
  width: 100%;
  background-color: #f7f7f7;
  overflow: hidden;
  padding-bottom: 80px;
  .center-content {
    height: 100%;
    min-height: 800px;
    padding-top: 20px;
  }
}
.learn-content {
  header {
    width: 100%;
    height: 182px;
    background: #fff;
    border-radius: 6px;
    overflow: hidden;
    font-size: 16px;
    .user-info {
      float: left;
      height: 88px;
      margin-top: 45px;
      margin-left: 23px;
      .user-info-avater {
        float: left;
        width: 88px px;
        height: 88px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 88px;
        }
      }
      .user-info-content {
        margin-top: 15px;
        float: right;
        margin-left: 12px;
        p {
          margin: 15px 0;
        }
        .className {
          padding: 2px 9px;
          background: #eef3f7;
          max-width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .user-nav {
      float: right;
      margin-top: 40px;
      .user-nav-item {
        float: left;
        margin-right: 87px;
        text-align: center;
        cursor: pointer;
        .nav-item-img {
          position: relative;
          vertical-align: middle;
          display: inline-block;
          img {
            width: 58px;
            height: 58px;
          }
        }
        p {
          font-size: 20px;
          margin-top: 18px;
        }
      }
    }
  }
  .class-content {
    margin-top: 14px;
    background: #fff;
    min-height: 559px;
    border-radius: 6px;
    padding: 27px 33px;
    .class-head {
      border-bottom: 1px solid #eef3f7;
      padding-bottom: 13px;
      span {
        cursor: pointer;
        margin-right: 15px;
        vertical-align: middle;
        &:nth-child(2) {
          border-left: 1px solid #000;
          padding-left: 10px;
        }

        &.active {
          color: $theme-color-font;
          font-weight: 700;
          font-size: 18px !important;
        }
      }
    }

    .class-ctx {
      padding: 39px 0 39px 13px;
      .class-item {
        text-align: center;
        margin-bottom: 10px;
        margin-right: 20px;
        float: left;
        transition: all 0.1s;
        position: relative;
        cursor: pointer;
        width: 180px;
        padding: 0 0 10px;
        overflow: hidden;
        border-radius: 6px;
        box-shadow: rgba(215, 219, 221, 0.5) 8px 8px 18px 0;
        img {
          width: 100%;
          height: 134px;
          margin-bottom: 10px;
        }
        p {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        &:hover {
          -webkit-box-shadow: 0 4px 4px 1px #e0ecfb;
          box-shadow: 0 4px 4px 1px #e0ecfb;
          -webkit-transform: translateY(-6px);
          transform: translateY(-6px);
          background: #f5f7fa;
        }
      }
    }
  }
}
</style>
