<template>
  <div class="msg">
    <div class="notice-top-box clearfix">
      <div class="fl">
        <i class="iconfont icon-back"></i>
        <span class="notice-title-text">我的通知</span>
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
    <div class="content-box msg-ctx">
      <None v-if="!msgList || msgList.length < 1" />
      <el-collapse @change="handleChange" accordion>
        <el-collapse-item
          class="msg-item"
          v-for="item in msgList"
          :key="item.id"
          :name="item.id"
        >
          <template slot="title">
            <div class="msg-item-title">
              <i class="el-icon el-icon-bell"></i>
              <h3>{{ item.title }}</h3>
              <el-tag
                class="msg-title-tag"
                :type="item.readed == 1 ? 'success' : 'warning'"
                >{{ item.readed == 1 ? "已读" : "未读" }}</el-tag
              >
            </div>
          </template>
          <div class="msg-item-ctx">
            {{ item.content }}
            <div class="msg-ctx-btn">
              <span>{{ item.sendUser }}</span>
              <span>{{ item.createTime }}</span>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div style="text-align: center">
        <el-pagination
          v-if="total > 10"
          :current-page.sync="current"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="total"
        >
          <!-- @current-change="getCourseList" -->
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import None from "@/components/common/no-databox.vue";
import eduApi from "@/api/edu.js";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      msgList: [],
      total: 0,
      current: 1,
    };
  },
  components: {
    None,
  },
  created() {
    this.getMsgByList();
  },
  methods: {
    ...mapActions("user", ["getMsg"]),
    handleChange(val) {
      if (val === "") {
        return;
      }
      let _this = this;
      let selectItem = _this.msgList.filter((d) => d.id === val)[0];
      // console.log(val, selectItem);
      if (!selectItem.readed) {
        eduApi.readByMsg(val).then((re) => {
          selectItem.readed = true;
          this.getMsg();
        });
      }
    },
    getMsgByList() {
      eduApi.getMsgByList(this.current).then((res) => {
        if (res.code == 20000) {
          this.msgList = res.data.rows;
          this.total = res.data.total;
        }
      });
    },
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

// /deep/.msg-ctx .el-collapse-item__header {
//   height: 85px;
//   line-height: 85px;
// }

.msg-ctx {
  padding: 0 20px;
  .msg-item {
    position: relative;
  }
  .msg-item-title {
    display: flex;
    align-items: center;
    margin: 0 20px;
    h3 {
      font-weight: initial;
    }
    .el-icon {
      width: 50px;
    }
    .msg-title-tag {
      position: absolute;
      right: 100px;
    }
  }
  .msg-item-ctx {
    text-align: left;
    padding: 20px 50px;
  }
  .msg-ctx-btn {
    margin: 10px 0 0 0;
    font-size: 12px;
    color: gray;
    text-align: right;
    span {
      margin-left: 10px;
    }
  }
}
</style>
