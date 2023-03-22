<template>
  <div class="release">
    <div class="center-content">
      <el-form label-position="left" label-width="80px" :model="askform">
        <el-form-item label="文章标题">
          <el-input
            v-model="askform.title"
            show-word-limit
            maxlength="40"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="选择板块">
          <el-select
            size="small"
            v-model="askform.cateId"
            placeholder="请选择板块"
          >
            <el-option
              v-for="item in forumTablist"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="选择标签">
          <el-select
            v-model="askform.tagList"
            size="small"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择文章标签"
          >
            <el-option
              v-for="item in forumTaglist"
              :key="item.id"
              :label="'# ' + item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <!-- <el-form-item label="选择标签">
          <el-select
            size="small"
            placeholder="请选择热门标签"
          >
            <el-option
              v-for="item in forumTaglist"
              :key="item.id"
              :label="'# ' + item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item> -->

        <div>
          <v-md-editor v-model="askform.content" height="500px"></v-md-editor>

          <!-- <quill-editor
            class="quill-editor"
            ref="mwQuillEditor"
            v-model="askform.content"
            :options="editorOption"
          ></quill-editor> -->
        </div>
        <div style="text-align: right; margin: 30px 0">
          <el-button size="small" @click="$router.go(-1)">取消</el-button>
          <el-button type="primary" size="small" @click="saveAcl"
            >发表问答</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import eduApi from "@/api/edu.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      askform: {
        cateId: "",
        content: "",
        title: "",
        tagList: [],
      },
      forumTablist: [],
      forumTaglist: [],
    };
  },
  created() {
    this.getAclCateList();
    this.getAclTagList();

    if (this.$route.query && this.$route.query.id) {
      this.getAclInfo(this.$route.query.id);
    }
  },
  computed: {
    ...mapState({ userInfo: (state) => state.user }),
  },
  methods: {
    getAclInfo(aclId) {
      eduApi.getAclById(aclId).then((res) => {
        if (res.code == 20000) {
          Object.keys(this.askform).forEach((key) => {
            this.askform[key] = res.data.item[key];
          });
          this.askform.tagList = res.data.item.tagList.map((e) => e.name);
          console.log(this.askform);
        }
      });
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    getAclCateList() {
      eduApi.getAclCateList().then((res) => {
        if (res.code == 20000) {
          this.forumTablist = res.data.list;
        }
      });
    },
    getAclTagList() {
      eduApi.getAclTagList().then((res) => {
        if (res.code == 20000) {
          this.forumTaglist = res.data.list;
        }
      });
    },
    saveAcl() {
      if (!this.userInfo.token) {
        return this.$message.error("请先登录后再操作！");
      }

      if (this.$route.query && this.$route.query.id) {
        this.askform.id = this.$route.query.id;
        eduApi.updateAcl(this.askform).then((res) => {
          if (res.code == 20000) {
            this.$message.success(res.message);
            this.$router.push("/forumCenter/page");
          }
        });
      } else {
        eduApi.saveAcl(this.askform).then((res) => {
          if (res.code == 20000) {
            this.$message.success(res.message);
            this.$router.push("/forumCenter/page");
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.release {
  min-height: 800px;
  padding-top: 20px;
  background-color: #f7f7f7;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.el-tag + .button-new-tag {
  margin-left: 10px;
}
.button-new-tag {
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-right: 10px;
  vertical-align: bottom;
}
</style>
