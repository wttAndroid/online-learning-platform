<template>
  <div class="news">
    <div class="center-content">
      <header>
        <!-- 搜索部分 -->
        <div class="header-search">
          <div class="search_left">
            <h2>新闻资讯</h2>
          </div>
        </div>
      </header>
      <div class="news-list clearfix">
        <None v-if="!newsList || !newsList.length" tips="空空如也" />
        <ul class="newsList_box">
          <li
            class="clearfix"
            v-for="item in newsList"
            :key="item.id"
            @click="$router.push(`/news/detail/${item.id}`)"
          >
            <div class="img_left">
              <img :src="item.cover" alt="" />
            </div>
            <div class="rightMes">
              <div class="topMes clearfix">
                <p class="title">{{ item.title }}</p>
                <p class="time">
                  <i class="el-icon el-icon-time"></i>
                  {{ item.createTime }}
                </p>
              </div>
              <div class="text" v-html="item.content">
                {{ item.content }}
              </div>
            </div>
          </li>
        </ul>
        <div style="text-align: center" v-if="total > 10">
          <el-pagination
            :current-page.sync="current"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="total"
            @current-change="getnewsList"
          >
          </el-pagination>
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
      total: 0,
      current: 1,
      newsList: [],
    };
  },
  components: {
    None,
  },
  methods: {
    getnewsList() {
      eduApi.getAffichelist(this.current).then((res) => {
        if (res.code == 20000) {
          this.newsList = res.data.rows;
          this.total = res.data.total;
        }
      });
    },
  },
  created() {
    this.getnewsList();
  },
};
</script>
<style lang="scss" >
.news .el-dialog,
.news .el-pager li {
  background: transparent !important;
  -webkit-box-sizing: border-box;
}
.news .el-pagination .btn-next,
.news .el-pagination .btn-prev {
  background: transparent !important;
}

.news {
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

.news-list {
  background: #fff;
  min-height: 500px;
}
.newsList_box {
  padding: 33px 30px 49px 16px;
  li {
    padding-bottom: 14px;
    border-bottom: 1px solid #f2f6fc;
    margin-bottom: 40px;
    .img_left {
      float: left;
      width: 224px;
      height: 126px;
      img {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 4px;
      }
    }
    .rightMes {
      float: right;
      width: 900px;
      height: 126px;
      .topMes {
        height: 22px;
        line-height: 22px;
        margin-top: 10px;
        margin-bottom: 15px;
        .title {
          font-size: 16px;
          font-weight: 500;
          color: #303133;
          letter-spacing: 2px;
          float: left;
          cursor: pointer;
        }
        .time {
          color: #909399;
          font-size: 12px;
          letter-spacing: 1px;
          float: right;
          .el-icon {
            font-size: 16px;
            vertical-align: text-bottom;
          }
        }
      }
      .text {
        font-size: 14px;
        height: 57px;
        font-weight: 400;
        color: #909399;
        line-height: 20px;
        letter-spacing: 1px;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>
