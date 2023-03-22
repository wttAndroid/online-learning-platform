<template>
  <div class="teacherdetail">
    <div class="center-content">
      <header>
        <!-- 搜索部分 -->
        <div class="header-search">
          <div class="search_left">
            <h2>讲师介绍</h2>
          </div>
        </div>
        <div class="user-header">
          <div class="user-info clearfix" v-if="teacher">
            <div class="user-info-avater">
              <img :src="teacher.avatar" alt="" />
            </div>
            <div class="user-info-content">
              <p style="font-weight: bold">{{ teacher.teacherName }}</p>
              <p class="className">{{ teacher.career }}</p>
              <div class="teacher-item-text">
                {{ teacher.intro }}
              </div>
            </div>
          </div>
        </div>
      </header>
      <div class="teacher-ctx">
        <div class="class-head">
          <span class="active">发布课程</span>
        </div>
        <div class="class-ctx clearfix">
          <None v-if="!classList || classList.length < 1" tips="空空如也" />
          <div
            class="class-item"
            v-for="item in classList"
            :key="item.id"
            @click="$router.push(`/courseDetail?id=${item.courseId}`)"
          >
            <img :src="item.cover" alt="" />
            <p>{{ item.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eduApi from "@/api/edu.js";
import None from "@/components/common/no-databox.vue";

export default {
  data() {
    return {
      classList: [],
      teacher: null,
    };
  },
  components: {
    None,
  },
  created() {
    if (this.$route.query && this.$route.query.id) {
      this.getTeacherInfo(this.$route.query.id);
    }
  },
  methods: {
    getTeacherInfo(id) {
      eduApi.getTeacherInfo(id).then((res) => {
        if (res.code == 20000) {
          this.teacher = res.data.teacher;
          this.classList = res.data.course;
        } else {
          this.$message.error(res.message);
        }
      });
    },
  },
};
</script>

<style lang="scss" >
.teacherdetail .el-dialog,
.teacherdetail .el-pager li {
  background: transparent !important;
  -webkit-box-sizing: border-box;
}
.teacherdetail .el-pagination .btn-next,
.teacherdetail .el-pagination .btn-prev {
  background: transparent !important;
}

.teacherdetail {
  width: 100%;
  background-color: #f7f7f7;
  overflow: hidden;
  padding-bottom: 80px;
}

.header-search {
  display: flex;
  justify-content: space-between;
  -webkit-box-align: center;
  margin-bottom: 20px;
  -webkit-box-pack: justify;
  align-items: center;
  .search_left {
    flex: 1;
    height: 44px;
    line-height: 44px;
    overflow: hidden;
  }
}
.user-header {
  width: 100%;
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
  font-size: 16px;
  .user-info {
    float: left;
    margin: 45px 0 45px 23px;
    .user-info-avater {
      float: left;
      width: 88px;
      height: 88px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 88px;
      }
    }
    .user-info-content {
      max-width: 90%;
      float: right;
      margin-left: 12px;
      p {
        margin: 5px 0;
      }
      .className {
        font-size: 13px;
        padding: 2px 9px;
        background: #eef3f7;
        max-width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: auto;
        display: inline-block;
      }
      .teacher-item-text {
        padding-top: 20px;
        margin: auto;
        border-top: 1px solid #e3e3e3;
        line-height: 22px;
        font-size: 10px;
      }
    }
  }
}
.teacher-ctx {
  margin-top: 14px;
  background: #fff;
  min-height: 559px;
  border-radius: 6px;
  padding: 27px 33px;
  .class-head {
    border-bottom: 1px solid #eef3f7;
    padding-bottom: 13px;
    span {
      margin-right: 15px;
      vertical-align: middle;
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
</style>
