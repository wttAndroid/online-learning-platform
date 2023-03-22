<template>
  <div class="doctx">
    <div class="exam-left">
      <div class="exam-tool">
        <h3 class="tool-title">{{ form.name }}</h3>
        <div class="bor">
          <span>试卷得分：{{ answer.score }} </span>
          <br />
          <span>试卷耗时：{{ formatSeconds(answer.doTime) }}</span>
        </div>

        <div class="bor">
          <span :key="item.itemOrder" v-for="item in answer.answerItems">
            <!-- <el-tag class="do-exam-title-tag">{{ item }}</el-tag> -->
            <el-tag
              :type="questionDoRightTag(item.doRight)"
              class="do-exam-title-tag"
              @click="goAnchor('#question-' + item.itemOrder)"
              >{{ item.itemOrder }}</el-tag
            >
          </span>
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
              <QuestionAnswerShow
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
import { formatSeconds } from "@/utils/date";
import QuestionAnswerShow from "../components/QuestionAnswerShow";
// import examPaperAnswerApi from '@/api/examPaperAnswer'
import eduApi from "@/api/edu.js";

export default {
  components: { QuestionAnswerShow },
  data() {
    return {
      form: {},
      formLoading: false,
      answer: {
        id: null,
        score: 0,
        doTime: 0,
        answerItems: [],
        doRight: false,
      },
    };
  },
  created() {
    let id = this.$route.query.id;
    let _this = this;
    if (id && parseInt(id) !== 0) {
      _this.formLoading = true;
      eduApi.readExamAnswer(id).then((re) => {
        _this.form = re.data.items.paper;
        _this.answer = re.data.items.answer;
        _this.formLoading = false;
      });
    }
  },
  methods: {
    formatSeconds(theTime) {
      return formatSeconds(theTime);
    },
    questionDoRightTag(status) {
      return this.enumFormat(this.doRightTag, status);
    },
    goAnchor(selector) {
      this.$el.querySelector(selector).scrollIntoView({
        behavior: "instant",
        block: "center",
        inline: "nearest",
      });
    },
  },
  computed: {
    ...mapGetters("enumItem", ["enumFormat"]),
    ...mapState("enumItem", {
      doRightTag: (state) => state.exam.question.answer.doRightTag,
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
}

.do-exam-title-tag {
  margin-left: 5px;
  margin-bottom: 5px;
  cursor: pointer;
}
</style>
