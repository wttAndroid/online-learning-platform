<template>
  <div>
    <el-dialog
      title="注册"
      :visible.sync="dialogFormRegister"
      @close="closeDialog"
      width="25%"
      center
    >
      <el-form
        :model="RegisterForm"
        status-icon
        ref="RegisterForm"
        :rules="RegisterRules"
        label-width="100px"
      >
        <el-form-item label="学号" prop="stuId">
          <el-input
            placeholder="请输入学号"
            v-model="RegisterForm.stuId"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            placeholder="请输入邮箱"
            v-model="RegisterForm.email"
          ></el-input>
        </el-form-item>

        <el-form-item label="设置密码" prop="password">
          <el-input
            placeholder="6~12个字符"
            type="password"
            v-model="RegisterForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input
            autocomplete="off"
            placeholder="请输入有效6位验证码"
            v-model="RegisterForm.code"
          >
            <template slot="append">
              <div @click.prevent="getRegisterCode()">
                <span v-show="isRegistercodeShow">获取验证码</span>
                <span v-show="!isRegistercodeShow" class="count"
                  >{{ codeegisterCount }} s</span
                >
              </div>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          style="width: 100%"
          type="primary"
          round
          @click.native="registerClick"
          >确 定</el-button
        >
        <div class="button-wjmm">
          <a @click="gologinClick()">已激活，去登录</a>
        </div>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { register } from "@/api/user";
import { sendRegisterEmail } from "@/api/default";
export default {
  data() {
    return {
      isRegistercodeShow: true,
      codeegisterCount: 0,
      dialogFormRegister: false,
      RegisterForm: {
        stuId: "",
        email: "",
        password: "",
        code: "",
      },
      loading: false,
      RegisterRules: {
        stuId: [{ required: true, trigger: "blur", message: "请输入学号" }],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
        email: [{ required: true, trigger: "blur", message: "请输入邮箱" }],
        code: [{ required: true, trigger: "blur", message: "请输入验证码" }],
      },
    };
  },
  computed: {
    dialogregister() {
      return this.$store.state.dialog.register;
    },
  },
  watch: {
    dialogregister(val, news) {
      // console.log(val, news, "-------------");
      this.dialogFormRegister = val;
    },
    deep: true,
  },
  methods: {
    gologinClick() {
      this.$store.dispatch("dialog/setregister", false);
      this.$store.dispatch("dialog/setlogin", true);
    },
    closeDialog() {
      this.$store.dispatch("dialog/setregister", false);
    },
    getRegisterCode() {
      // 获取短信验证码
      if (!this.RegisterForm.email || !this.RegisterForm.stuId) {
        this.$message.error("请输入您的信息！");
        return;
      }
      sendRegisterEmail(this.RegisterForm).then((res) => {
        if (res.code == 20000) {
          this.$message.success("发送成功！");
          this.codeRegisterShowEvent();
        }
      });
    },
    codeRegisterShowEvent() {
      // 验证码倒计时
      if (!this.timer) {
        this.codeegisterCount = 60;
        this.isRegistercodeShow = false;
        this.timer = setInterval(() => {
          if (this.codeegisterCount > 0 && this.codeegisterCount <= 60) {
            this.codeegisterCount--;
          } else {
            this.isRegistercodeShow = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },

    registerClick() {
      this.$refs.RegisterForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          register(this.RegisterForm).then((res) => {
            if (res.code == 20000) {
              this.$message.success(res.message);
            } else {
              this.$message.error(res.message);
            }
            this.loading = false;
            this.$store.dispatch("dialog/setregister", false);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
