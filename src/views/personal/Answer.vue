<template>
  <div class="answer" style="padding: 20px; position: relative">
    <el-button
      @click="$router.push('/askrelease')"
      type="primary"
      plain
      class="answer-button"
    >
      发布内容
    </el-button>
    <el-tabs v-model="answerActive">
      <el-tab-pane label="我的帖子" name="first">
        <None v-if="!aclList || aclList.length < 1" tips="空空如也" />
        <div class="answer-content-box">
          <ul class="lists-box">
            <li
              class="lists-box-item clearfix"
              v-for="item in aclList"
              :key="item.id"
            >
              <a
                @click="$router.push(`/forumCenter/detail/${item.id}`)"
                class="ques-list-title fl"
                target="_blank"
                >{{ item.title }}
                <a
                  v-if="item.tagList"
                  v-for="tag in item.tagList"
                  class="topic-t"
                >
                  <span>#{{ tag.name }}#</span>
                </a>

                <p class="ques-list-text">
                  <i class="elicon el-icon-star-off"></i
                  ><span>{{ item.viewCount }}</span
                  ><i class="elicon el-icon-star-off"></i><span>1</span>
                </p>
              </a>
              <div class="ques-list-tool fr">
                <div>
                  <el-button
                    size="mini"
                    type="primary"
                    icon="el-icon-edit"
                    circle
                    @click="$router.push(`/askrelease?id=` + item.id)"
                  ></el-button>
                  <el-button
                    size="mini"
                    type="warning"
                    icon="el-icon-delete"
                    @click="deleteAtc(item.id)"
                    circle
                  ></el-button>
                </div>
                <div style="margin-top: 8px">
                  {{ item.createTime }}
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div style="text-align: center; padding: 10px 0" v-if="acltotal > 10">
          <el-pagination
            :current-page.sync="current"
            background
            layout="total,prev, pager, next"
            :total="acltotal"
            @current-change="getAclUsList"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的评论" name="second">
        <None v-if="!remarkList || remarkList.length < 1" tips="空空如也" />
        <div class="answer-content-box">
          <ul class="lists-box">
            <li
              class="lists-box-item clearfix"
              v-for="item in remarkList"
              :key="item.id"
            >
              <a
                @click="$router.push(`/forumCenter/detail/${item.articleId}`)"
                class="ques-list-title fl"
                target="_blank"
                ><div v-html="item.content">
                  {{ item.content }}
                </div>
                <p
                  class="ques-list-pingj"
                  :class="{ through: item.artEnable == 0 }"
                >
                  《{{ item.artTitle }}》
                </p>
              </a>
              <div class="ques-list-tool fr">
                <div>
                  <el-button
                    size="mini"
                    type="warning"
                    icon="el-icon-delete"
                    @click="deleteCom(item.id)"
                    circle
                  ></el-button>
                </div>
                <div style="margin-top: 8px">{{ item.createTime }}</div>
              </div>
            </li>
          </ul>
        </div>
        <div style="text-align: center; padding: 10px 0" v-if="comtotal > 10">
          <el-pagination
            :current-page.sync="current2"
            background
            layout="total,prev, pager, next"
            :total="comtotal"
            @current-change="getAclComList"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import eduApi from "@/api/edu.js";
import None from "@/components/common/no-databox.vue";
export default {
  data() {
    return {
      answerActive: "first",
      remarkList: [],
      aclList: [],
      acltotal: 0,
      comtotal: 0,
      current: 1,
      current2: 1,
    };
  },
  components: {
    None,
  },
  created() {
    this.getAclUsList();
    this.getAclComList();
  },
  methods: {
    getAclUsList() {
      eduApi.getAclUsList(this.current).then((res) => {
        if (res.code == 20000) {
          this.aclList = res.data.rows;
          this.acltotal = res.data.total;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    getAclComList() {
      eduApi.getAclComList(this.current2).then((res) => {
        if (res.code == 20000) {
          this.remarkList = res.data.rows;
          this.comtotal = res.data.total;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    deleteAtc(id) {
      eduApi.deleAclUs(id).then((res) => {
        if (res.code == 20000) {
          this.$message.success(res.message);
          this.getAclUsList();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    deleteCom(id) {
      eduApi.deleComment(id).then((res) => {
        if (res.code == 20000) {
          this.$message.success(res.message);
          this.getAclComList();
        } else {
          this.$message.error(res.message);
        }
      });
    },
  },
};
</script>

<style lang="scss" >
.answer .el-tabs__nav {
  height: 50px;
}
.answer .el-tabs__item {
  font-size: 16px;
}
.answer-button {
  position: absolute;
  right: 20px;
  z-index: 1;
}
.lists-box {
  .lists-box-item {
    padding: 20px 0;
    border-bottom: 1px solid #eee;
    .ques-list-title {
      font-size: 16px;
      float: left;
      color: #333;
      text-align: left;
      .topic-t {
        margin-left: 12px;
        line-height: 20px;
        font-size: 14px;
        font-weight: 400;
        color: #ff9e3f;
        cursor: pointer;
      }
    }
    .ques-list-pingj {
      padding: 20px 0px 0px 0px;
      color: #bcb6b6;
      font-size: 14px;
    }
    .ques-list-text {
      padding-top: 20px;
      color: #bcb6b6;
      font-size: 14px;
      .elicon {
        padding: 0px 2px 0px 10px;
        font-size: 16px;
      }
    }
    .ques-list-tool {
      font-size: 14px;
      color: #999;
      text-align: right;
    }
  }
}
.through {
  text-decoration: line-through;
  color: #ff9e3f !important;
}
</style>
