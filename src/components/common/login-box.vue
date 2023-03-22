<template>
  <div>
    <el-dialog
      title="学生登录"
      :visible.sync="dialogFormLogin"
      @close="closeDialog"
      width="25%"
      center
    >
      <el-form
        ref="loginForm"
        :rules="loginRules"
        :model="loginForm"
        class="form-login"
        v-loading="loading"
        element-loading-text="正在登录……"
      >
        <el-form-item prop="stuId">
          <el-input
            style="background: #eef3f5"
            placeholder="请输入学号"
            v-model="loginForm.stuId"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            style="background: #eef3f5"
            placeholder="请输入6~12位的密码"
            v-model="loginForm.password"
            autocomplete="off"
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button style="width: 100%" type="primary" round @click="loginClick"
          >确 定</el-button
        >
        <div class="button-wjmm"><a @click="goFindClick()">忘记密码</a></div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormLogin: false,
      loginRules: {
        stuId: [{ required: true, trigger: "blur", message: "请输入学号" }],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
      },
      loading: false,
      loginForm: {
        stuId: "",
        password: "",
      },
    };
  },
  computed: {
    dialoglogin() {
      return this.$store.state.dialog.login;
    },
  },
  watch: {
    dialoglogin(val, news) {
      // console.log(val, news, "-------------");
      this.dialogFormLogin = val;
    },
    deep: true,
  },
  methods: {
    closeDialog() {
      this.$store.dispatch("dialog/setlogin", false);
    },
    loginClick() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
              this.$store.dispatch("dialog/setlogin", false);
            })
            .catch((err) => {
              // this.$message.error(err);
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    goFindClick() {
      this.$store.dispatch("dialog/setlogin", false);
      this.$store.dispatch("dialog/setformpasswrod", true);
    },
  },
};
</script>
<style >
.form-login .el-input__inner {
  height: 45px;
  line-height: 45px;
  background: #eef3f5;
}
</style>
