<template>
  <div>
    <keep-alive>
      <div class="header-ct">
        <div class="header-logo">
          <img src="../../assets/img/logo2.png" alt="" />
        </div>
        <ul class="header-nav">
          <router-link
            :to="items.path"
            tag="li"
            @click.native="selectMenu(items.id)"
            v-for="(items, index) in menuList"
            :class="defaultSelectPage === items.id ? 'active' : ''"
            :key="index"
          >
            {{ items.label }}
            <span class="active-span"></span>
          </router-link>
        </ul>
        <div class="header-user">
          <div v-if="userInfo.token">
            <div
              style="
                right: 50%;
                display: inline-block;
                margin-right: 50px;
                line-height: 15px;
              "
            >
              <el-badge
                class="item"
                :value="userInfo.msgCount > 0 ? userInfo.msgCount : ''"
              >
                <!-- <el-button size="small">评论</el-button> -->

                <span
                  class="el-icon el-icon-message"
                  style="
                    font-size: 25px;
                    vertical-align: middle;
                    cursor: pointer;
                  "
                  @click="$router.push('/notice/msg')"
                ></span>
              </el-badge>
            </div>
            <!-- <el-dropdown style="right: 50%">
              <el-badge class="item">
                <span class="el-icon el-icon-message"></span>
              </el-badge>
            </el-dropdown> -->
            <el-dropdown>
              <span class="el-dropdown-link">
                <img :src="userInfo.user.userHead" />
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  @click.native="$router.push('/personalCenter')"
                  >个人中心</el-dropdown-item
                >
                <el-dropdown-item @click.native="gofindpassword()"
                  >修改密码</el-dropdown-item
                >
                <el-dropdown-item @click.native="logoutClick()"
                  >退出</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div v-else>
            <el-button
              type="primary"
              round
              size="mini"
              @click.native="gologinClick()"
              >登录</el-button
            >
            <el-button round size="mini" @click.native="goregister()"
              >注册</el-button
            >
          </div>
        </div>
      </div>
    </keep-alive>

    <LoginBox />
    <RegisterBox />
    <FormpassBox />
    <FindpassBox />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
// import { sendEmail, sendRegisterEmail } from "@/api/default";
import LoginBox from "@/components/common/login-box";
import RegisterBox from "@/components/common/register-box";
import FormpassBox from "@/components/common/formpass_box";
import FindpassBox from "@/components/common/findpass_box";

export default {
  name: "header-common",
  components: {
    LoginBox,
    RegisterBox,
    FormpassBox,
    FindpassBox,
  },
  data() {
    return {
      timer: null,
      // iscodeShow: true,
      // codeCount: 0,
      // isRegistercodeShow: true,
      // codeegisterCount: 0,
      // loading: false,
      // dialogFormFindpass: false,
      // dialogFormRegister: false,
      // dialogFormLogin: false,
      dialogFormPassword: false,
      defaultSelectPage: 0,
      menuList: [
        { label: "首页", id: 1, path: "/homeCenter" },
        {
          label: "选修课",
          id: 2,
          path: "/courseCenter",
        },
        {
          label: "学习中心",
          id: 3,
          path: "/learnCenter",
        },
        {
          label: "讲师",
          id: 4,
          path: "/teacherCenter",
        },
        {
          label: "问答",
          id: 5,
          path: "/forumCenter",
        },
      ],
      // ruleForm: {
      //   oldPassword: "",
      //   newPassword: "",
      //   confirmNewPassword: "",
      // },
      // RegisterForm: {
      //   stuId: "",
      //   email: "",
      //   password: "",
      //   code: "",
      // },
      loginForm: {
        stuId: "",
        password: "",
      },
      loginRules: {
        stuId: [{ required: true, trigger: "blur", message: "请输入学号" }],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
      },
      // findForm: {
      //   stuId: "",
      //   password: "",
      //   email: "",
      //   code: "",
      // },
      // passRules: {
      //   newPassword: [{ validator: validatePass, trigger: "blur" }],
      //   confirmNewPassword: [{ validator: validatePass2, trigger: "blur" }],
      //   oldPassword: [
      //     { message: "请输入旧密码", trigger: "blur", required: true },
      //   ],
      // },
      // RegisterRules: {
      //   stuId: [{ required: true, trigger: "blur", message: "请输入学号" }],
      //   password: [{ required: true, trigger: "blur", message: "请输入密码" }],
      //   email: [{ required: true, trigger: "blur", message: "请输入邮箱" }],
      //   code: [{ required: true, trigger: "blur", message: "请输入验证码" }],
      // },
    };
  },

  watch: {
    $route: {
      handler(to, from) {
        let item = this.menuList.find((item) => {
          return item.path == to.path;
        });

        if (item && item.id) this.defaultSelectPage = item.id;
      },
      deep: true,
      immediate: true,
    },
  },

  computed: {
    ...mapState({ userInfo: (state) => state.user }),
    defaultSelectPages() {},
  },
  destroyed() {},

  mounted() {
    // console.log(this.userInfo);
    this.getInfo();
    this.getMsg();
  },
  methods: {
    ...mapActions("user", ["getInfo", "logout", "getMsg"]),
    goregister() {
      this.$store.dispatch("dialog/setregister", true);
    },
    gologinClick() {
      this.$store.dispatch("dialog/setlogin", true);
      this.$store.dispatch("dialog/setregister", false);
    },
    logoutClick() {
      this.logout();
    },
    selectMenu(id) {
      this.defaultSelectPage = id;
    },
    gofindpassword() {
      this.$store.dispatch("dialog/setfindpass", true);
    },
  },
};
</script>
<style lang="scss">
.el-dropdown-link {
  width: 50px;
  cursor: pointer;
  img {
    width: 32px;
    height: 32px;
    display: inline-block;
    vertical-align: middle;
  }
}
.header-ct {
  width: 1200px;
  height: 60px;
  margin: 0 auto;
  position: relative;
  letter-spacing: 2px;
  color: #9aabb8;
  line-height: 60px;
  .header-logo {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 60px;
    font-size: 20px;
    font-weight: 700;
    padding-left: 15px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-right: 180px;
    line-height: 60px;
    float: left;
    img {
      width: 152px;
      margin-top: 1px;
    }
  }
  .header-nav {
    float: left;
    height: 60px;
    padding-left: 10px;
    font-size: 16px;
    line-height: 60px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    li {
      width: 108px;
      text-align: center;
      float: left;
      position: relative;
      height: 60px;
      transition: all 0.3s;
      cursor: pointer;
      &.active {
        color: $theme-color-font;
        font-size: 18px;
        font-weight: 700;
        position: relative;
        .active-span {
          width: 2em;
        }
      }
      .active-span {
        width: 0px;
        height: 4px;
        display: block;
        border-radius: 4px;
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
        position: absolute;
        z-index: 2;
        bottom: -4px;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);

        // background: linear-gradient(90deg, #0059c5, #49d9e3);
        background: $theme-color-bg;
      }
    }
  }
  .header-user {
    height: 60px;
    float: right;
  }

  // .el-dropdown {
  //   position: absolute;
  //   right: 0;
  //   top: 35px;
  //   height: 36px;
  //   line-height: 36px;
  //   cursor: pointer;
  //   .cp {
  //     font-size: 36px;
  //     color: #009cde;
  //     padding-right: 5px;
  //     vertical-align: middle;
  //   }
  // }
}

// .form-login .el-input__inner {
//   height: 45px;
//   line-height: 45px;
//   background: #eef3f5;
// }
.button-wjmm {
  margin: 15px 0;
  letter-spacing: 2px;
  text-align: right;
  font-size: 12px;
}
</style>

