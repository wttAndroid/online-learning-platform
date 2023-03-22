<template>
  <div class="teacher">
    <div class="center-content">
      <header>
        <!-- 搜索部分 -->
        <div class="header-search">
          <div class="search_left">
            <h2>全部讲师</h2>
          </div>
          <div class="search_right">
            <div class="input_word_search">
              <el-input
                placeholder="输入你想搜索得讲师"
                class="input-with-select"
                size="small"
                v-model="searchValue"
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="getTeacherList"
                ></el-button>
              </el-input>
            </div>
          </div>
        </div>
      </header>
      <div class="teacher-list clearfix">
        <None v-if="!teacherList || !teacherList.length" tips="空空如也" />
        <div
          v-else
          class="teacher-list-item"
          v-for="item in teacherList"
          :key="item.id"
          @click="$router.push(`/teacherDetail?id=${item.teacherId}`)"
        >
          <div class="teacher-item-img">
            <img :src="item.avatar" alt="" />
            <div class="teacher-username">{{ item.teacherName }}</div>
            <div class="teacher-userinfo">{{ item.career }}</div>
          </div>
          <div class="teacher-item-text">
            {{ item.intro }}
          </div>
        </div>
      </div>
      <div style="text-align: center">
        <el-pagination
          :current-page.sync="current"
          :page-size="size"
          layout="total, prev, pager, next"
          :total="total"
          @current-change="getTeacherList"
        >
        </el-pagination>
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
      searchValue: "",
      current: 1,
      size: 8,
      total: 0,
      teacherList: [],
    };
  },
  created() {
    this.getTeacherList();
  },
  components: {
    None,
  },
  methods: {
    getTeacherList() {
      eduApi
        .getTeacherList(this.searchValue, this.current, this.size)
        .then((res) => {
          if (res.code == 20000) {
            this.teacherList = res.data.rows;
            this.total = res.data.total;
          }
        });
    },
  },
};
</script>

<style lang="scss" >
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

.teacher .el-dialog,
.teacher .el-pager li {
  background: transparent !important;
  -webkit-box-sizing: border-box;
}
.teacher .el-pagination .btn-next,
.teacher .el-pagination .btn-prev {
  background: transparent !important;
}

.teacher {
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

.teacher-list {
  .teacher-list-item {
    cursor: pointer;
    width: 245px;
    height: 310px;
    border: 1px solid #eef3f7;
    background: #f5f7fa;
    -webkit-box-shadow: 4px 4px 33px 0 #dae8f0;
    box-shadow: 4px 4px 33px 0 #dae8f0;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
    padding-top: 40px;
    -webkit-box-sizing: border-box;
    letter-spacing: 2px;
    box-sizing: border-box;
    float: left;
    margin-bottom: 68px;
    &:not(:nth-child(4n)) {
      margin-right: 68px;
    }
    .teacher-username {
      font-size: 16px;
      font-weight: 500;
      margin-top: 10px;
    }
    .teacher-userinfo {
      font-size: 10px;
      margin: 5px 0 27px;
    }
    .teacher-item-img {
      text-align: center;
      img {
        width: 50px;
        border-radius: 50%;
      }
    }
    .teacher-item-text {
      width: 163px;
      padding-top: 20px;
      margin: auto;
      border-top: 1px solid #e3e3e3;
      line-height: 22px;
      font-size: 10px;
      overflow: hidden;

      word-break: break-all;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }
    &:hover {
      background: #fff;
    }
  }
}
</style>
