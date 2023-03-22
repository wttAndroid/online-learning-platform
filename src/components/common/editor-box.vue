


<template>
  <div class="message-editor-box">
    <v-md-editor v-model="content" height="200px"></v-md-editor>
    <div class="editor-btn">
      <el-button @click="sendComment" type="primary" size="small">{{
        btnName
      }}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    btnName: {
      type: String,
      default: "发表评论",
    },
    rootId: {
      type: Number,
      default: 0,
    },
    toAuthorId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      content: "",
    };
  },
  methods: {
    sendComment() {
      this.$parent.sendComment({
        content: this.content,
        toAuthorId: this.toAuthorId,
        rootId: this.rootId,
      });
    },
    clearCtx() {
      this.content = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.message-editor-box {
  margin: 20px 0;
  .editor-btn {
    margin-top: 10px;
    text-align: right;
  }
}
</style>
