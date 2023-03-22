<template>
  <div class="personal">
    <div class="center-content">
      <div class="left_mes">
        <div class="user_avatar">
          <img
            :src="
              userInfo.user.userHead ||
              'https://attachment-center.boxuegu.com/data/attachment/univ/defalut_avartar/student.jpg'
            "
            alt=""
          />
        </div>
        <ul class="mes-tab">
          <router-link
            to="/personalCenter/information"
            tag="li"
            active-class="active"
            class="clearfix"
          >
            <div class="icon_box">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABIBAMAAACnw650AAAAJ1BMVEUUxDFHcEwcxjsZxjcSwDARwTURwTURwTQRwDMRwTUQwTUQwTMSwTYRzLNQAAAADHRSTlMaAAkTNN7xjFSrym9dH5OMAAAB0ElEQVRIx42WvU4CQRSFL7sYURpgX2AXXoClsqTQmBgLC38aWy0MhYU2hoLWxMLCgsLSaENBa2KpqDgPJe7syj3DzOw9Hbtf7p4Z7h81Qe1OlyjstfEp8R+tBaEVJi6oQ0w9OxQTKLBBBsMpsn7L+GIBRWRRakBdGxQiFJNVAYda5FDCoNgFBUvIGSgPRd5AeagMIo8KKPJBaQ51fVCooRZ5lWRQ5IfSDMKz1W5eRub5yDhbbaLUfGScjwxLQ7XQp2GKmg3+YENluuTPKgsILL1p6AtNEd7SqYbmeFMEvmsqF1hvEvheLyAwlVBk8a3UPVwnNcqhCsXlUIBQvYCmHqg60MysjxAm06OGvjGlDGhHQ4deaCu78o++P8X2/qAHKtHt8dmYSlUtBbZzeUztPp/nuriCF+x09YH612zquIKhYvrhULyacTrUyPrfbQLEEoFD+wi9M6hhVsqqqQpL36ELSlkhOCMlrKTuEPpiJbUszjWEDnhxxitFZ5ReAA1jwpk5NIwWJlyhJ2g9rBlcL5kTbGKs91Rfj3KN+0Y7jKx5YzRWUYsWNXvZ2BANINkoEw1F0XiVDWrRyJctD7I1RLTQyFYj2ZIlW9dki59zhfwFWqI7gkwBfSsAAAAASUVORK5CYII="
                alt=""
              />
            </div>
            <p>个人资料</p>
          </router-link>
          <!-- 
          <router-link
            to="/personalCenter/myClasses"
            tag="li"
            active-class="active"
            class="clearfix"
          >
            <div class="icon_box">
              <img
                src="https://stu.ityxb.com/img/icon_jiankangketang.8cf6a5b7.png"
                alt=""
              />
            </div>
            <p>我的课程</p>
          </router-link> -->

          <router-link
            to="/personalCenter/answer"
            tag="li"
            active-class="active"
            class="clearfix"
          >
            <div class="icon_box">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABIBAMAAACnw650AAAAJ1BMVEUnbNhHcEwscN0zc9okaNcladYladYlZ9QkaNcjaNclaNcmaNcmaddPVnw5AAAADHRSTlMaAA8IuPFdMHtE25ml9I7LAAABuUlEQVRIx42WPU7DQBCFX+yIGGhCuIAdLuCQC6RAiCIlRIIqDdBQpOCnoaBJgeQiR6D1ERCUCUW0h2L9A5ldz67nFZHsfHqamV3PDI4MjYfQGo7Nt6APgxi1gsQFnYLohIdiGAo4yGIo9Q+laCi0oQEYJRYEViaU8lBIoWM4NCJQ6oLCHeQ0qq3gNaqt4E5tl2Dx0/dBnRqKfVBQQcfwalRCfT/UKaHYDwUlhBYV0KANSjTEhNRbmEGBK/dtbhYdXNzZZm5EDibuRaRmRqXQjDvKLauEgbLtKlIfBtRILlIqx/KNpodGcplSm9W+kV4DOlRaM/Piwa7AdwH9mKdnQ6WRkVsBcUYz/2FyRg1NBUZdgVGvNLoWRLRdod0pR+9Fa+Fg9vBYGi2vtC7pP6SYBxNtlde12joq/rRGt4jo+U7rnkLkgB/UBJ9cZ6FQptZsuCG9dFN1M0d0VumCXjpyfb/etdGrqrTx3fE/p3MKtbYC3QzQ1lSqjzNtg0K+YdhdTNh6RE1M1g5FjVXUokXNXjY2RANINspEQ1E0XmWDWjTyZcuDbA0RLTSy1Ui2ZMnWNb0bChY/5wr5C2mYjkef/k6uAAAAAElFTkSuQmCC"
                alt=""
              />
            </div>
            <p>我的问答</p>
          </router-link>
        </ul>
      </div>
      <div class="right_view clearfix">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      options: [
        {
          value: "zhinan",
          label: "数字媒体技术",
          children: [
            {
              value: "shejiyuanze",
              label: "2021级",
              children: [
                {
                  value: "yizhi",
                  label: "一班",
                },
                {
                  value: "fankui",
                  label: "二班",
                },
                {
                  value: "xiaolv",
                  label: "三班",
                },
              ],
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航",
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航",
                },
              ],
            },
          ],
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局",
                },
                {
                  value: "color",
                  label: "Color 色彩",
                },
                {
                  value: "typography",
                  label: "Typography 字体",
                },
                {
                  value: "icon",
                  label: "Icon 图标",
                },
                {
                  value: "button",
                  label: "Button 按钮",
                },
              ],
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框",
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框",
                },
                {
                  value: "input",
                  label: "Input 输入框",
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器",
                },
                {
                  value: "select",
                  label: "Select 选择器",
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器",
                },
                {
                  value: "switch",
                  label: "Switch 开关",
                },
                {
                  value: "slider",
                  label: "Slider 滑块",
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器",
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器",
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器",
                },
                {
                  value: "upload",
                  label: "Upload 上传",
                },
                {
                  value: "rate",
                  label: "Rate 评分",
                },
                {
                  value: "form",
                  label: "Form 表单",
                },
              ],
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格",
                },
                {
                  value: "tag",
                  label: "Tag 标签",
                },
                {
                  value: "progress",
                  label: "Progress 进度条",
                },
                {
                  value: "tree",
                  label: "Tree 树形控件",
                },
                {
                  value: "pagination",
                  label: "Pagination 分页",
                },
                {
                  value: "badge",
                  label: "Badge 标记",
                },
              ],
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告",
                },
                {
                  value: "loading",
                  label: "Loading 加载",
                },
                {
                  value: "message",
                  label: "Message 消息提示",
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框",
                },
                {
                  value: "notification",
                  label: "Notification 通知",
                },
              ],
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单",
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页",
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑",
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单",
                },
                {
                  value: "steps",
                  label: "Steps 步骤条",
                },
              ],
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框",
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示",
                },
                {
                  value: "popover",
                  label: "Popover 弹出框",
                },
                {
                  value: "card",
                  label: "Card 卡片",
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯",
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板",
                },
              ],
            },
          ],
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components",
            },
            {
              value: "sketch",
              label: "Sketch Templates",
            },
            {
              value: "jiaohu",
              label: "组件交互文档",
            },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapState({ userInfo: (state) => state.user }),
  },
};
</script>

<style lang="scss" scoped>
.personal {
  width: 100%;
  background-color: #f5f7fa;
  overflow: hidden;
  padding-bottom: 80px;
  img {
    width: 100%;
    height: 100%;
  }

  .center-content {
    height: 100%;
    min-height: 800px;
    padding-top: 20px;
    .left_mes {
      float: left;
      min-height: 759px;
      width: 185px;
      height: 100%;
      background: #ebeef5;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      padding: 53px 22px;
      text-align: center;
      .user_avatar {
        display: inline-block;
        width: 80px;
        height: 80px;
        overflow: hidden;
        border-radius: 80px;
        position: relative;
        text-align: center;
      }
      .mes-tab {
        margin-top: 22px;
        li {
          margin-bottom: 20px;
          color: #303133;
          cursor: pointer;
          .icon_box {
            float: left;
            width: 36px;
            height: 36px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
          }
          p {
            float: left;
            margin-left: 10px;
            height: 36px;
            line-height: 36px;
            font-size: 14px;
          }
          &.active {
            color: $theme-color-font;
          }
        }
      }
    }
    .right_view {
      position: relative;
      width: 1015px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      float: right;
      min-height: 759px;
      height: 100%;
      background: #fff;
    }
  }
}
.el-input {
  width: 300px;
}
.el-cascader {
  width: 230px;
}
.el-form-item {
  margin-left: 20px;
}
</style>
