<template>
  <div>
    <el-dialog
      title="找回密码"
      :visible.sync="dialogFormFindpass"
      @close="closeDialog"
      width="25%"
      center
    >
      <el-form v-model="findForm" class="form-login">
        <el-form-item>
          <el-input
            style="background: #eef3f5"
            placeholder="请输入学号"
            v-model="findForm.stuId"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            style="background: #eef3f5"
            placeholder="请输入绑定密码"
            type="password"
            v-model="findForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            style="background: #eef3f5"
            placeholder="请输入绑定邮箱"
            v-model="findForm.email"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            autocomplete="off"
            placeholder="请输入有效6位验证码"
            v-model="findForm.code"
          >
            <template slot="append">
              <div @click.prevent="getCode()">
                <span style="cursor: pointer" v-show="iscodeShow"
                  >获取验证码</span
                >
                <span v-show="!iscodeShow" class="count"
                  >{{ codeCount }} s</span
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
          @click="findPasswordClick()"
          >确 定</el-button
        >
        <div class="button-wjmm" style="text-align: left">
          <a @click="backLoginClick()">返回立即登录</a>
        </div>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { findpass } from "@/api/user";
import { sendEmail } from "@/api/default";
export default {
  data() {
    return {
      dialogFormFindpass: false,
      findForm: {
        stuId: "",
        password: "",
        email: "",
        code: "",
      },
      codeCount: 0,
      iscodeShow: true,
    };
  },
  computed: {
    dialogfindpass() {
      return this.$store.state.dialog.findpass;
    },
  },
  watch: {
    dialogfindpass(val, news) {
      this.dialogFormFindpass = val;
    },
    deep: true,
  },
  methods: {
    // 获取短信验证码
    getCode() {
      if (!this.findForm.email || !this.findForm.stuId) {
        this.$message.error("请输入您的信息！");
        return;
      }
      console.log(this.findForm);
      sendEmail(this.findForm).then((res) => {
        if (res.code == 20000) {
          this.$message.success("发送成功！");
          this.codeShowEvent();
        }
      });
    },
    codeShowEvent() {
      // 验证码倒计时
      if (!this.timer) {
        this.codeCount = 60;
        this.iscodeShow = false;
        this.timer = setInterval(() => {
          if (this.codeCount > 0 && this.codeCount <= 60) {
            this.codeCount--;
          } else {
            this.iscodeShow = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    closeDialog() {
      this.$store.dispatch("dialog/setfindpass", false);
    },
    findPasswordClick() {
      findpass(this.findForm).then((res) => {
        if (res.code == 20000) {
          this.$message.success(res.message);
          this.dialogFormFindpass = false;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    backLoginClick() {
      this.$store.dispatch("dialog/setlogin", true);
      this.$store.dispatch("dialog/setfindpass", false);
    },
  },
};
</script>
