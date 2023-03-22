<template>
  <div class="forumdetail">
    <!-- 当前位置 -->
    <header class="forum-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">问答</el-breadcrumb-item>
        <el-breadcrumb-item>{{ aclInfo.cateName }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ aclInfo.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </header>

    <div class="forum-page">
      <h1>{{ aclInfo.title }}</h1>
      <div class="details-user-name-details">
        <div class="community-top">
          <img :src="aclInfo.stuHead" lazy="loaded" />
          <div class="name-box">
            <b>{{ aclInfo.stuName }}</b>
            <div style="display: flex; justify-content: space-between">
              <div class="name-info">
                <span>发布于{{ aclInfo.createTime }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="detailCon">
        <v-md-editor :value="aclInfo.content" mode="preview"></v-md-editor>
        <!-- <div class="myEditorTxt" v-html="aclInfo.content">
          {{ aclInfo.content }}
        </div> -->
      </div>
    </div>
    <div class="forum-details-bottom">
      <div class="bottom-left">
        <span class="thanks-tips" v-for="tag in aclInfo.tagList"
          >#{{ tag.name }}#</span
        >
      </div>
      <div class="bottom-right">
        <ul class="toolBar">
          <li>
            <a href="/ask/release?id=25450" class="" target="_blank"></a
            ><!---->
          </li>
          <li>
            <span class="icon-box"
              ><i
                class="el-icon-s-comment show-icon"
                style="font-size: 18px"
              ></i
              ><span class="startNum">{{ aclInfo.viewCount }}</span></span
            >
          </li>
          <li>
            <span class="icon-box"
              ><i class="el-icon-star-on show-icon" style="font-size: 20px"></i
              ><span class="startNum">{{ aclInfo.viewCount }}</span></span
            >
          </li>
        </ul>
      </div>
    </div>

    <div class="message-board">
      <div class="message-tit">
        <dt>
          全部评论<span>{{ commentList && commentList.length }}</span>
        </dt>
      </div>
      <div class="message-list" v-if="commentList && commentList.length">
        <div class="comment-item" v-for="item in commentList" :key="item.id">
          <div class="message-content-figure-tit">
            <img class="head" :src="item.authorHead" lazy="loaded" /><span
              ><p class="uname">{{ item.authorName }}</p>
              <b>{{ item.createTime }}</b></span
            >
            <div class="content">
              <div class="textCon">
                <!-- <pre
                  style="overflow: auto"
                > -->
                 <v-md-editor  :value="item.content" mode="preview"></v-md-editor>
                <!-- <div  class="myEditorTxt"><p v-html="item.content">{{item.content}}</p></div> -->
               <!-- </pre> -->
              </div>
              <div class="message-content-operation-btn">
                <span class="replyBtn">
                  <span class="icon-box" :class="{active:isshowRe==item.id}" @click="showEditbox(item)">
                    <i class="el-icon-s-comment show-icon" style="font-size: 16px;">
                    </i>
                  </span>
                  <span v-if="item.children">全部回复({{item.children&&item.children.length}})</span>
                 <span @click="deleComment(item.id)" v-if="isAuthorId(item.authorId)">删除</span>
                </span>
              </div>
            </div>
          </div>
          <div class="message-content-reply-box">
            <ul class="message-list" style="padding: 0px 20px">
              <li
                class="comment-item"
                v-for="comment in item.children"
                :key="comment.id"
              >
                <div class="message-content-figure-tit">
                  <img class="head"  :src="comment.authorHead" alt="" />
                  <span style="display: flex">
                    <em>
                      {{ comment.authorName }}
                      <span style="display: inline-block; margin: 0px 10px">
                        回复
                      </span>
                      {{ comment.toAuthorName }}
                    </em>
                    <b style="padding-top: 10px">{{ comment.createTime }}</b>
                  </span>
                  <div>
                    <div class="textCon">
                      <!-- <pre style="overflow: auto"> -->
                         <v-md-editor  :value="comment.content" mode="preview"></v-md-editor>
                         <!-- <div class="myEditorTxt" v-html="comment.content">
                          {{ comment.content }}
                        </div> -->

                     <!-- <div  class="myEditorTxt"><p v-html="comment.content">{{comment.content}} </p></div> -->
                          <!-- </pre> -->
                    </div>
                  </div>

              <div class="message-content-operation-btn malr">
                <span class="replyBtn">
                  <span class="icon-box" :class="{active:isshowReplay==comment.id}" @click="showEditboxReplay(comment)">
                    <i class="el-icon-s-comment show-icon" style="font-size: 16px;">
                    </i>
                  </span>
                  <span @click="deleComment(comment.id)" v-if="isAuthorId(comment.authorId)">删除</span>
                </span>
              </div>
                </div>
                 <div class="malr" v-if="isshowReplay==comment.id">
                  <EditorBox :rootId="item.id" :toAuthorId="comment.authorId"/>
                </div>
              </li>
            </ul>
          </div>
          <div class="malr" v-if="isshowRe==item.id">
             <EditorBox :rootId="item.id" :toAuthorId="item.authorId"/>
          </div>
        </div>
      </div>
       <EditorBox ref="commenEdior" />
     </div>
    </div>
  </div>
</template>

<script>
import eduApi from "@/api/edu.js";
import { mapState } from "vuex";
import EditorBox from "@/components/common/editor-box";
export default {
  data() {
    return {
      commentList: [],
      aclInfo: {},
      commentForm: {
        articleId: "", //文章id
        content: "", //内容
        rootId: 0, //根部评论
        toAuthorId: "", //接收者id
      },
      isshowRe: null,
      isshowReplay: null,
    };
  },
  components: {
    EditorBox,
  },
  watch: {
    $route(to) {
      if (to.params && to.params.id) {
        this.initlist(to.params.id);
      }
    },
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.initlist(this.$route.params.id);
    }
  },
  computed: {
    ...mapState({ userInfo: (state) => state.user }),
    isAuthorId() {
      return function (artId) {
        if (this.userInfo && this.userInfo.token) {
          return this.userInfo.user.stuId == artId;
        }
        return false;
      };
    },
  },
  methods: {
    deleComment(id) {
      eduApi.deleComment(id).then((res) => {
        if (res.code == 20000) {
          this.$message.success(res.message);
          this.initlist(this.$route.params.id);
        } else {
          this.$message.error(res.message);
        }
      });
    },
    showEditbox(item) {
      if (this.isshowRe == null) {
        this.isshowRe = item.id;
      } else {
        this.isshowRe = null;
      }
    },
    showEditboxReplay(comment) {
      if (this.isshowReplay == null) {
        this.isshowReplay = comment.id;
      } else {
        this.isshowReplay = null;
      }
    },
    initlist(id) {
      this.getAclById(id);
      this.getForumComment(id);
      this.commentForm.articleId = id;
    },
    init() {
      this.commentForm = {
        articleId: "", //文章id
        content: "", //内容
        rootId: 0, //根部评论
        toAuthorId: "", //接收者id
      };

      this.isshowRe = null;
      this.isshowReplay = null;
      this.$refs.commenEdior.clearCtx();
    },
    sendComment(info) {
      if (!this.$route.params || !this.$route.params.id) {
        return this.$message.error("请选择要发表评论的文章！");
      }
      this.commentForm = info;
      this.commentForm.articleId = parseInt(this.$route.params.id);
      eduApi.saveComment(this.commentForm).then((res) => {
        if (res.code == 20000) {
          this.$message.success(res.message);
          this.initlist(this.$route.params.id);
          this.init();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    getForumComment(id) {
      eduApi.getCommentByAcl(id).then((res) => {
        if (res.code == 20000) {
          this.commentList = res.data && res.data.item;
        }
      });
    },
    getAclById(id) {
      eduApi.getAclById(id).then((res) => {
        if (res.code == 20000) {
          this.aclInfo = res.data.item;
        }
      });
    },
  },
};
</script>


<style lang="scss" >
.malr {
  // margin-left: 58px;
  // margin-right: 62px;

  margin-left: 20px;
  margin-right: 20px;
}
.forum-page {
  background: rgb(255, 255, 255);
  padding: 30px;
  h1 {
    font-size: 22px;
    margin-bottom: 30px;
    font-weight: 700;
    line-height: 1;
    color: #333;
  }
  .details-user-name-details {
    width: 100%;
    height: 50px;
    margin-bottom: 30px;
    .community-top {
      display: flex;
      img {
        width: 50px px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .name-box {
        padding: 6px px 0 8px;
        width: 702px;
        border-bottom: 1px solid #f6f6f6;
        b {
          display: block;
          margin-bottom: 5px;
          font-size: 16px;
          font-weight: 700;
          color: #333;
          line-height: 16px;
        }
        .name-info span {
          font-size: 14px;
          font-weight: 400;
          color: #c3c3c3;
          line-height: 14px;
          margin-right: 20px;
        }
      }
    }
  }

  // .myEditorTxt {
  //   font-size: 15px;
  //   line-height: 1.8;
  //   img {
  //     width: 100%;
  //   }
  // }
  .detailCon {
    width: 702px;
    margin: 0 auto;
    font-size: 15px;
    line-height: 1.8;
    padding-bottom: 30px;
  }
}

.github-markdown-body {
  padding: 0px !important;
}
.v-md-editor {
  background: transparent !important;
}
.forum-header {
  padding-bottom: 16px;
}
.forum-details-bottom {
  padding: 0 34px;
  height: 71px;
  border-top: 1px solid #f6f6f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-radius: 0 0 8px 8px;
  margin-left: 0;

  .thanks-tips {
    line-height: 20px;
    font-size: 14px;
    font-weight: 400;
    color: #ff9e3f;
    cursor: pointer;
    margin-right: 5px;
  }
  .toolBar {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    li {
      text-align: center;
      cursor: pointer;
      margin-right: 20px;
      font-size: 14px;
      span {
        color: #dadada;
        font-size: 16px;
        i {
          font-size: 18px;
          vertical-align: middle;
          margin-right: 5px;
        }
      }
    }
  }
}
.message-board {
  width: 100%;
  min-height: 300px;
  background: #fff;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0 30px;
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
  .message-tit {
    width: 100%;
    height: 50px;
    line-height: 50px;
    margin-top: 20px;
  }
  .message-list {
    .comment-item {
      box-sizing: border-box;
      padding: 20px 0 30px 0;
      border-bottom: 1px solid #efefef;
      .message-content-reply-box .message-content-figure-tit {
        .head {
          width: 30px;
          height: 30px;
        }
      }
      .message-content-figure-tit {
        width: 100%;
        // margin-bottom: 20px;
        .head {
          width: 50px;
          height: 50px;
          float: left;
          border-radius: 50%;
          margin-right: 15px;
        }

        .uname {
          color: #333;
          font-size: 15px;
          font-weight: 700;
          display: inline-block;
          padding-top: 8px;
          margin-right: 40px;
        }
        span {
          font-size: 15px;
          font-weight: 400;
          display: block;
          margin-bottom: 16px;
          color: #c3c3c3;
        }
        em {
          color: #333;
          font-size: 15px;
          font-weight: 700;
          display: inline-block;
          padding-top: 8px;
          font-style: normal;
        }
        b {
          margin-left: 40px;
          font-weight: 400;
          color: #c3c3c3;
          font-size: 13px;
        }
        .textCon {
          line-height: 20px;
          margin-bottom: 10px;
          letter-spacing: 0.5px;
          font-family: Microsoft YaHei;
          color: #666;
        }
        .content {
          font-size: 14px;
          font-weight: 400;
          color: #333;
          margin-bottom: 0;
          padding-left: 57px;
          line-height: 20px;
        }
      }
      .message-content-operation-btn {
        width: calc(100% - 58px);
        margin-bottom: 10px;
        span {
          font-weight: 400;
          color: #c3c3c3;
          cursor: pointer;
          font-size: 13px;
          display: inline-block;
          margin-right: 15px;
        }
        .icon-box.active {
          color: #1058fa !important;
        }
      }
      .message-content-reply-box {
        margin-left: 58px;
        margin-right: 62px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0 0;
        position: relative;
        overflow: hidden;
        margin-top: 20px;
        background-color: #f6f6f6;
        border-radius: 5px;
      }
    }
  }
}
</style>
