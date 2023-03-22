<template>
  <div>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogFormPassword"
      @close="closeDialog"
      width="25%"
    >
      <el-form
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        :rules="passRules"
        label-width="100px"
      >
        <el-form-item label="输入旧密码" prop="oldPassword">
          <el-input
            placeholder="请输入旧密码"
            type="password"
            v-model="ruleForm.oldPassword"
          ></el-input>
        </el-form-item>
        <el-form-item label="设置新密码" prop="newPassword">
          <el-input
            placeholder="6~12个字符"
            type="password"
            v-model="ruleForm.newPassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="再次输入密码" prop="confirmNewPassword">
          <el-input
            placeholder="请再次输入密码"
            type="password"
            v-model="ruleForm.confirmNewPassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>


<script>
import { updatePass } from "@/api/user";

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "" || value.length < 6 || value.length > 12) {
        callback(new Error("请输入6-12位的密码"));
      } else {
        if (this.ruleForm.confirmNewPassword !== "") {
          this.$refs.ruleForm.validateField("confirmNewPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "" || value.length < 6 || value.length > 12) {
        callback(new Error("请再次输入您的的密码"));
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      dialogFormPassword: false,
      ruleForm: {
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      },
      passRules: {
        newPassword: [{ validator: validatePass, trigger: "blur" }],
        confirmNewPassword: [{ validator: validatePass2, trigger: "blur" }],
        oldPassword: [
          { message: "请输入旧密码", trigger: "blur", required: true },
        ],
      },
    };
  },
  computed: {
    dialogformpasswrod() {
      return this.$store.state.dialog.formpasswrod;
    },
  },
  watch: {
    dialogformpasswrod(val, news) {
      this.dialogFormPassword = val;
    },
    deep: true,
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updatePass(this.ruleForm).then((res) => {
            if (res.code == 20000) {
              this.$message.success(res.message);
              this.resetForm(formName);
              return;
            }
            this.$message.error(res.message);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$store.dispatch("dialog/setformpasswrod", false);
    },
    closeDialog() {
      this.$store.dispatch("dialog/setformpasswrod", false);
    },
  },
};
</script>
