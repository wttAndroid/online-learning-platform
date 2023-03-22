<template>
  <div class="doctx">
    <div class="exam-left">
      <div class="exam-tool">
        <h3 class="tool-title">{{ form.name }}</h3>
        <div class="bor">
          <span>总分：{{ form.score }}</span>
          <br />
          <span>时长：{{ form.suggestTime }}分钟</span>
        </div>

        <div class="bor">
          <span :key="item.itemOrder" v-for="item in answer.answerItems">
            <!-- <el-tag class="do-exam-title-tag">{{ item }}</el-tag> -->
            <el-tag
              :type="questionCompleted(item.completed)"
              class="do-exam-title-tag"
              @click="goAnchor('#question-' + item.itemOrder)"
              >{{ item.itemOrder }}</el-tag
            >
          </span>
        </div>

        <div class="bor center">
          剩余时间
          <p class="date">{{ formatSeconds(remainTime) }}</p>
        </div>
        <div class="center" style="margin-top: 10px">
          <el-button size="small" type="primary" @click="submitForm"
            >提交试卷</el-button
          >
        </div>
      </div>
    </div>
    <div class="exam-ctx">
      <el-form
        :model="form"
        ref="form"
        v-loading="formLoading"
        label-width="100px"
      >
        <div :key="index" v-for="(titleItem, index) in form.titleItems">
          <div class="exam-paper-title">{{ titleItem.name }}</div>
          <div class="exam-paper-item-box">
            <el-form-item
              :key="questionItem.itemOrder"
              :label="questionItem.itemOrder + '.'"
              v-for="questionItem in titleItem.questionItems"
              class="exam-question-item"
              label-width="50px"
              :id="'question-' + questionItem.itemOrder"
            >
              <QuestionEdit
                :qType="questionItem.questionType"
                :question="questionItem"
                :answer="answer.answerItems[questionItem.itemOrder - 1]"
              />
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import QuestionEdit from "../components/QuestionEdit";
// import { examselect } from "@/api/default";
// import { answerSubmit } from "@/api/default";
import eduApi from "@/api/edu.js";
import { formatSeconds } from "@/utils/date";
export default {
  components: { QuestionEdit },
  data() {
    return {
      form: {},
      forms: {
        classes: null,
        id: 77,
        level: 1,
        limitDateTime: null,
        name: "语文期末考试",
        paperType: 1,
        score: "33.5",
        subjectId: 4,
        suggestTime: 22,
        titleItems: [
          {
            name: "单选题",
            questionItems: [
              {
                analyze: null,
                correct: null,
                correctArray: null,
                difficult: null,
                gradeLevel: 1,
                id: 64,
                itemOrder: 1,
                questionType: 1,
                score: "1",
                subjectId: 4,
                title:
                  "中华四大名著都有哪些，下列正确的是中华四大名著都有哪些，下列正确的是中华四大名著都有哪些，下列正确的是中华四大名著都有哪些，下列正确的是中华四大名著都有哪些，下列正确的是中华四大名著都有哪些，下列正确的是中华四大名著都有哪些，下列正确的是",
                knowledgeIdList: [11],
                items: [
                  {
                    content: "哈哈哈哈哈哈哈哈哈哈哈",
                    itemUuid: null,
                    prefix: "A",
                    score: null,
                  },
                  {
                    content: "嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻",
                    itemUuid: null,
                    prefix: "B",
                    score: null,
                  },
                  {
                    content: "呵呵呵呵呵呵呵呵呵呵",
                    itemUuid: null,
                    prefix: "C",
                    score: null,
                  },
                  {
                    content: "嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿哈",
                    itemUuid: null,
                    prefix: "D",
                    score: null,
                  },
                ],
              },
              {
                analyze: null,
                correct: null,
                correctArray: null,
                difficult: null,
                gradeLevel: 1,
                id: 62,
                itemOrder: 2,
                items: [
                  { content: "1", itemUuid: null, prefix: "A", score: null },
                  { content: "2", itemUuid: null, prefix: "B", score: null },
                  { content: "3", itemUuid: null, prefix: "C", score: null },
                  { content: "4", itemUuid: null, prefix: "D", score: null },
                ],
                knowledgeIdList: [],
                questionType: 2,
                score: "3",
                subjectId: 4,
                title: "1+1=",
              },
              {
                analyze: null,
                correct: null,
                correctArray: null,
                difficult: null,
                gradeLevel: 1,
                id: 61,
                itemOrder: 3,
                items: [],
                knowledgeIdList: [],
                questionType: 5,
                score: "3",
                subjectId: 4,
                title: "白马浮绿水下一句？",
              },
              {
                analyze: null,
                correct: null,
                correctArray: null,
                difficult: null,
                gradeLevel: 1,
                id: 53,
                itemOrder: 4,
                items: [
                  {
                    content: "红楼梦",
                    itemUuid: null,
                    prefix: "1",
                    score: "2.5",
                  },
                  {
                    content: "白楼梦",
                    itemUuid: null,
                    prefix: "2",
                    score: "2.5",
                  },
                  {
                    content: "青楼梦",
                    itemUuid: null,
                    prefix: "3",
                    score: "2.5",
                  },
                  {
                    content: "绿楼梦",
                    itemUuid: null,
                    prefix: "4",
                    score: "2.5",
                  },
                ],
                knowledgeIdList: [8, 9],
                questionType: 4,
                score: "10",
                subjectId: 4,
                title:
                  '中华四大名著都有<span class="gapfilling-span">1</span>哪些，下列<span class="gapfilling-span ">2</span>正确<span class="gapfilling-span ">3</span>的<span class="gapfilling-span">4</span>是',
              },
            ],
          },
        ],
      },
      formLoading: false,
      answer: {
        questionId: null,
        doTime: 0,
        answerItems: [],
      },
      timer: null,
      remainTime: 0,
    };
  },
  created() {
    let id = this.$route.query.id;
    let _this = this;
    if (id && parseInt(id) !== 0) {
      _this.formLoading = true;

      eduApi.getByExamCtx(id).then((re) => {
        if (re.code == 20000) {
          _this.form = re.data.items;
          _this.remainTime = re.data.items.suggestTime * 60;
          _this.initAnswer();
          _this.timeReduce();
          _this.formLoading = false;
        } else {
          this.$message.error("该试卷不存在");
        }
      });

      // _this.initAnswer();
      // _this.remainTime = 0.1 * 60;
      // _this.timeReduce();
      // this.getByExamCtx();
    }

    this.$nextTick(() => {
      // 禁用右键
      document.oncontextmenu = new Function("event.returnValue=false");
      // 禁用选择
      document.onselectstart = new Function("event.returnValue=false");
      //禁止F12
      document.addEventListener("keydown", function (e) {
        if (e.key == "F12") {
          e.preventDefault(); // 如果按下键F12,阻止事件
        }
      });
    });
  },
  mounted() {},
  beforeDestroy() {
    window.clearInterval(this.timer);
  },
  methods: {
    formatSeconds(theTime) {
      return formatSeconds(theTime);
    },
    timeReduce() {
      let _this = this;
      this.timer = setInterval(function () {
        if (_this.remainTime <= 0) {
          _this.submitForm();
        } else {
          ++_this.answer.doTime;
          --_this.remainTime;
        }
      }, 1000);
    },
    questionCompleted(completed) {
      return this.enumFormat(this.doCompletedTag, completed);
    },
    goAnchor(selector) {
      this.$el.querySelector(selector).scrollIntoView({
        behavior: "instant",
        block: "center",
        inline: "nearest",
      });
    },
    initAnswer() {
      this.answer.id = this.form.id;
      let titleItemArray = this.form.titleItems;
      for (let tIndex in titleItemArray) {
        let questionArray = titleItemArray[tIndex].questionItems;
        for (let qIndex in questionArray) {
          let question = questionArray[qIndex];
          this.answer.answerItems.push({
            questionId: question.id,
            content: null,
            contentArray: [],
            completed: false,
            itemOrder: question.itemOrder,
          });
        }
      }
    },
    submitForm() {
      let _this = this;
      window.clearInterval(_this.timer);
      _this.formLoading = true;
      console.log(this.answer);
      eduApi
        .answerSubmit(this.answer)
        .then((re) => {
          if (re.code === 20000) {
            _this.$alert("试卷得分：" + re.data.items + "分", "考试结果", {
              confirmButtonText: "返回考试记录",
              callback: (action) => {
                _this.$router.push("/notice/exam");
              },
            });
            _this.$message.success(re.message);
          } else {
            _this.$message.error(re.message);
          }
          _this.formLoading = false;
        })
        .catch((e) => {
          _this.formLoading = false;
        });
    },
  },
  computed: {
    ...mapGetters("enumItem", ["enumFormat"]),
    ...mapState("enumItem", {
      doCompletedTag: (state) => state.exam.question.answer.doCompletedTag,
    }),
  },
};
</script>

<style lang="scss" scoped>
.align-center {
  text-align: center;
}

.exam-question-item {
  padding: 10px;

  .el-form-item__label {
    font-size: 15px !important;
  }
}

.question-title-padding {
  padding-left: 25px;
  padding-right: 25px;
}

.doctx {
  position: relative;
  padding: 20px 100px;
  display: flex;
  flex-direction: row;
  background: #eff3f7;

  .exam-tool {
    border: 1px solid #e4e7ed;
    border-radius: 5px;
    overflow: hidden;
    width: 260px;
    position: fixed;
    min-height: 95%;
    padding: 25px 15px;
    box-sizing: border-box;
    background: #fff;
    .tool-title {
      font-size: 20px;
      font-weight: 300;
      margin-bottom: 10px;
    }
    .bor {
      padding: 15px 0;
      border-bottom: 1px solid gainsboro;
    }
    .center {
      text-align: center;
    }
    .date {
      font-size: 18px;
      color: orangered;
      margin-top: 8px;
    }
  }
  .exam-left {
    width: 260px;
    margin-right: 20px;
  }
  .exam-ctx {
    border: 1px solid #e4e7ed;
    flex: 1 1 0%;
    background: red;
    min-height: 1000px;
    background: #ffff;
    .exam-paper-title {
      font-size: 18px;
      line-height: 25px;
      padding: 18px 20px;
      background: #fafafa;
      border-top: 1px solid #dedede;
      border-bottom: 1px solid #dedede;
    }
    .exam-paper-item-box {
      padding: 30px;
      font-size: 14px;
      color: #4c596b;
    }
  }

  // .exam-ctx {
  //   margin-left: 400px;
  //   width: 65%;
  //   background: rebeccapurple;
  // }
  // .exam-tool {
  //   width: 100px;
  //   min-height: 500px;
  //   position: fixed;
  //   top: 20px;
  //   background: red;
  //   margin-top: 50px;
  // }
}

.do-exam-title-tag {
  margin-left: 5px;
  margin-bottom: 5px;
  cursor: pointer;
}
</style>
