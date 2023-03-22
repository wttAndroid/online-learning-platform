<template>
  <div>
    <div class="tab-title-box">
      <span class="tab-item">个人资料</span>
    </div>
    <div class="tab-content-box">
      <el-form
        class="personal-el-form"
        ref="form"
        label-width="80px"
        size="mini"
        :model="formUser"
      >
        <h2 class="personal-base-header">基本信息</h2>
        <el-form-item label="头像">
          <el-upload
            action=""
            :show-file-list="false"
            :http-request="uploadHttp"
            :before-upload="beforeAvatarUpload"
            accept=".png, .jpg, .jpeg"
          >
            <el-avatar :size="100" :src="formUser.userHead || ''" fit="cover">
              <img
                alt=""
                src="data:image/png;base64,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"
              />
            </el-avatar>
          </el-upload>

          <!-- <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload> -->
        </el-form-item>

        <el-form-item label="昵称">
          <el-input
            maxlength="10"
            show-word-limit
            v-model="formUser.nickName"
          ></el-input>
        </el-form-item>

        <el-form-item label="邮箱">
          <el-input placeholder="请输入邮箱" v-model="formUser.userEmail">
          </el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input placeholder="请输入内容" v-model="formUser.userName">
          </el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input
            placeholder="请输入内容"
            v-model="formUser.stuId"
            :disabled="true"
          >
          </el-input>
        </el-form-item>

        <el-form-item size="mini">
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import oss from "@/api/oss";
import { profile } from "@/api/user";
export default {
  data() {
    return {
      formUser: {
        stuId: "",
        userName: "",
        nickName: "",
        userHead: "",
        userEmail: "",
      },
    };
  },
  computed: {
    ...mapState({ userInfo: (state) => state.user }),
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions("user", ["getInfo"]),
    init() {
      this.getInfo().then((res) => {
        this.formUser = res.item;
      });
    },
    /**
     * 图片限制
     */
    beforeAvatarUpload(file) {
      const isJPEG = file.name.split(".")[1] === "jpeg";
      const isJPG = file.name.split(".")[1] === "jpg";
      const isPNG = file.name.split(".")[1] === "png";
      const isLt500K = file.size / 1024 / 500 < 2;
      if (!isJPG && !isJPEG && !isPNG) {
        this.$message.error("上传图片只能是 JPEG/JPG/PNG 格式!");
      }
      if (!isLt500K) {
        this.$message.error("单张图片大小不能超过 500KB!");
      }
      return (isJPEG || isJPG || isPNG) && isLt500K;
    },
    onSubmit() {
      console.log(this.formUser);
      profile(this.formUser).then((res) => {
        if (res.code == 20000) {
          this.$message.success(res.message);
          this.init();
        }
      });
    },
    /**
     * 阿里云OSS上传
     */
    uploadHttp(param) {
      const formData = new FormData();
      console.log(param.file);
      formData.append("file", param.file);
      oss
        .uploadAvater(formData)
        .then((rsp) => {
          console.log("上传图片成功", rsp);
          if (rsp && rsp.success) {
            this.formUser.userHead = rsp.data.url;
          }
        })
        .catch((response) => {
          console.log("图片上传失败", response);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.tab-title-box {
  display: flex;
  height: 51px;
  line-height: 51px;
  border-bottom: 1px solid #e2e2e2;
  background: #ebeef5;

  .tab-item {
    margin-left: 40px;
    color: $theme-color-font;
    line-height: 51px;
    height: 52px;
    min-width: 65px;
    padding: 0 15px;
    text-align: center;
    cursor: pointer;
    font-size: 18px;
    float: left;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-top: 2px solid $theme-color-font;
    background: #fff;
  }
}
.tab-content-box {
  background: #fff;
  padding: 0 30px;
  .personal-base-header {
    font-size: 14px;
    font-weight: 400;
    padding: 0 15px;
    margin-bottom: 30px;
    margin-top: 20px;
  }
  .personal-el-form {
  }
}
</style>
