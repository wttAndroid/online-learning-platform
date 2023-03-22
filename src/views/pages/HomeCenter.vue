<template>
  <div>
    <!-- 轮播图 -->
    <div class="banner">
      <el-carousel height="500px">
        <el-carousel-item v-for="item in banner" :key="item.id">
          <img :src="item.imageUrl" :alt="item.title" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 友情链接 -->
    <div class="friendlinks homemok">
      <div class="flink-content center-content">
        <div
          class="flink-item fadeInUp"
          v-for="(item, key) in blogroll"
          :key="item.id"
          :style="{ animationDelay: key * 0.1 + 's' }"
          @click="goLinkClick(item.link)"
        >
          <div class="flink-item-img">
            <!-- <img src="@/assets/img/presentation.png" alt="" /> -->
            <img :src="item.cover" alt="" />
          </div>
          <div class="flink-item-text">
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
    <!-- 最新公告 and  热门问答 -->
    <div class="recommend homemok">
      <div class="recommend-content center-content">
        <div class="left-notice recommend-item">
          <div class="notice-title">
            <span class="title-text">
              <svg class="icon-font">
                <use xlink:href="#icon-gonggao"></use>
              </svg>
              <!-- <i class="iconfont icon-gonggao"></i> -->
              最新公告
            </span>
            <a
              class="title-right"
              target="_blank"
              @click="$router.push(`/news/list`)"
            >
              查看更多
              <i class="el-icon-d-arrow-right"></i
            ></a>
          </div>
          <div class="notice-list">
            <div
              class="notice-list-item"
              v-for="item in affiche"
              :key="item.id"
              @click="$router.push(`/news/detail/${item.id}`)"
            >
              <a class="noticeitem-text ellipsis" :title="item.title"
                ><i class="iconfont icon-yuandian"></i>
                {{ item.title }}
              </a>
              <!-- <div class="noticeitem-time">{{ item.createTime 2023-01-26}}</div> -->
              <div class="noticeitem-time">
                {{ new Date(item.updateTime).format() }}
              </div>
            </div>
          </div>
        </div>
        <div class="right-forum recommend-item">
          <div class="notice-title">
            <span class="title-text">
              <svg class="icon-font">
                <use xlink:href="#icon-wendang1"></use>
              </svg>
              热门问答
            </span>
            <a
              class="title-right"
              @click="$router.push('/forumCenter')"
              target="_blank"
            >
              查看更多
              <i class="el-icon-d-arrow-right"></i
            ></a>
          </div>
          <div class="notice-list">
            <div
              class="notice-list-item"
              v-for="item in aclhot"
              :key="item.artId"
            >
              <a
                class="noticeitem-text"
                @click="$router.push(`/forumCenter/detail/${item.artId}`)"
                :title="item.title"
                ><i class="iconfont icon-yuandian"></i>
                {{ item.title }}
              </a>
              <div class="noticeitem-time">
                {{ new Date(item.createTime).format() }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 热门课程 -->
    <div class="hotCourse homemok">
      <div class="hotCourse-content center-content">
        <h3 class="mok-title">热门学习资源</h3>
        <div class="hotCourse-list clearfix">
          <div
            class="hotCourse-list-item fadeInUp"
            v-for="(item, key) in course"
            :key="item.id"
            :style="{ animationDelay: key * 0.1 + 's' }"
            @click="$router.push(`/courseDetail?id=${item.courseId}`)"
          >
            <div class="item-img">
              <img :src="item.cover" :alt="item.title" />
            </div>
            <h2 class="item-text ellipsis">
              {{ item.title }}
            </h2>
          </div>
        </div>
        <div class="mok-more">
          <a @click="$router.push('/courseCenter')">
            更多
            <i class="el-icon el-icon-d-arrow-right"></i>
          </a>
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
      affiche: [],
      banner: [],
      blogroll: [],
      course: [],
      aclhot: [],
    };
  },
  created() {
    eduApi.getHomeList().then((res) => {
      if (res.code == 20000) {
        this.affiche = res.data.affiche;
        this.banner = res.data.banner;
        this.blogroll = res.data.blogroll;
        this.course = res.data.course;
        this.aclhot = res.data.aclhot;
      }
      // console.log(res);
    });
  },
  methods: {
    goLinkClick(link) {
      window.open(link, "_blank");
      // window.location.href = link;
    },
  },
};
</script>

<style lang="scss" scoped>
.homemok {
  padding: 78px 0;
}
.mok-more {
  text-align: center;
  a {
    font-size: 22px;
    letter-spacing: 2px;
    font-weight: 600;
    .el-icon {
      display: inline-block;
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
      font-weight: 400;
    }
  }
}
.mok-title {
  text-align: center;
  line-height: 37px;
  letter-spacing: 3px;
  font-weight: 600;
  font-size: 26px;
  padding-bottom: 52px;
}
.center-content {
  width: 1200px;
  margin: auto;
}
.banner {
  padding-top: 5px;
  img {
    width: 100%;
    height: 100%;
  }
}
.fadeInUp {
  animation-name: fadeInUp;
  animation-duration: 0.5s;
  animation-delay: 0.3s;
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }
  to {
    opacity: 1;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }
}
.friendlinks {
  .flink-content {
    width: 1230px;
    display: flex;
    .flink-item {
      cursor: pointer;
      width: 254px;
      height: 310px;
      border: 1px solid #eef3f7;
      background: #f5f7fa;
      -webkit-box-shadow: 4px 4px 33px 0 #dae8f0;
      box-shadow: 4px 4px 33px 0 #dae8f0;
      -webkit-transition: all 0.2s;
      transition: all 0.2s;
      padding-top: 40px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      // animation-delay: 0.3s;
      // animation-duration: 1s;
      .flink-item-img {
        text-align: center;
        img {
          width: 60%;
        }
      }
      .flink-item-text {
        width: 163px;
        padding-top: 27px;
        margin: auto;
        font-size: 16px;
        font-weight: 500;
        line-height: 22px;
        letter-spacing: 2px;
      }
      &:hover {
        background: #fff;
      }

      &:not(:first-child) {
        margin-left: 68px;
      }
    }
  }
}
.recommend {
  background: #f5f7fa;
  .recommend-content {
    margin: auto;
    display: flex;
    justify-content: space-around;
    .recommend-item {
      overflow: hidden;
      width: 567px;
      height: 360px;
      border-radius: 6px;
      background-color: #fff;
      padding: 24px 30px 30px 20px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      -webkit-transition: all 0.2s;
      transition: all 0.2s;
      &:hover {
        box-shadow: 4px 4px 5px 4px #e4e8eb;
      }
    }
    .left-notice,
    .right-forum {
      .notice-title {
        border-bottom: 1px solid #ebeef5;
        padding-bottom: 26px;
        .title-text {
          color: #303133;
          font-weight: 600;
          line-height: 22px;
          letter-spacing: 2px;
          font-size: 16px;
        }
        .title-right {
          color: #606266;
          font-size: 14px;
          letter-spacing: 1px;
          float: right;
        }
      }
      .notice-list {
        padding-top: 27px;
        .notice-list-item {
          display: flex;
          font-size: 14px;
          color: #606266;
          .noticeitem-text {
            text-align: left;
            line-height: 20px;
            letter-spacing: 1px;
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            -webkit-transition: all 0.2s;
            transition: all 0.2s;
            color: inherit;
            &:hover {
              color: $theme-color-font;
            }
          }
          .noticeitem-time {
            width: 110px;
            text-align: right;
          }
          &:not(:first-child) {
            margin-top: 14px;
          }
        }
      }
    }
  }
}
.hotCourse {
  .hotCourse-content {
    .hotCourse-list {
      .hotCourse-list-item {
        float: left;
        border-radius: 6px;
        overflow: hidden;
        box-shadow: rgba(215, 219, 221, 0.5) 8px 8px 18px 0;
        width: 226px;
        height: 224px;
        margin-bottom: 36px;
        -webkit-transition: all 0.2s;
        transition: all 0.2s;
        cursor: pointer;
        .item-img {
          width: 100%;
          height: 166px;
          border-radius: 0 0 6px 6px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .item-text {
          line-height: 58px;
          text-align: center;
          color: #303133;
          font-size: 14px;
          padding: 0 10px;
        }
        &:hover {
          transform: translateY(-5px);
          box-shadow: 10px 10px 16px 0 #b6cdd8;
        }
        &:not(:nth-child(5n)) {
          margin-right: 17px;
        }
      }
    }
  }
}
</style>
