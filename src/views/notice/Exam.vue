<template>
  <div class="msg">
    <div class="notice-top-box clearfix">
      <div class="fl">
        <i class="iconfont icon-back"></i>
        <span class="notice-title-text">我的作业</span>
      </div>
      <div class="fr">
        <el-button
          icon="el-icon-arrow-left "
          @click="$router.go(-1)"
          size="small"
          circle
        ></el-button>
        返回
      </div>
    </div>
    <div class="content-box examctx">
      <div class="examctx-header">
        <div class="item-contain">
          <span class="title">考试类型：</span>
          <div class="item-radio">
            <el-radio-group v-model="search.paperType" size="mini">
              <el-radio-button label="1">随堂练习</el-radio-button>
              <el-radio-button label="2">考试试卷</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div class="item-contain">
          <span class="title">我的课程：</span>
          <div class="item-radio">
            <el-radio-group v-model="search.courseId" size="mini">
              <el-radio-button
                v-for="item in courseList"
                :key="item.id"
                :label="item.courseId"
                >《{{ item.title }}》-{{ item.teacherName }}</el-radio-button
              >
            </el-radio-group>
          </div>
        </div>
      </div>

      <div class="card-exam-list clearfix">
        <None v-if="!examList || examList.length < 1" />
        <div class="card-exam-item" v-for="item in examList" :key="item.id">
          <div class="card-exam-box">
            <div class="ellipsis">{{ item.name }}</div>
            <div class="font-desc">学科：{{ item.courseName }}</div>
            <div class="font-desc">讲师：{{ item.createUserName }}</div>
            <div class="font-desc">题目数：{{ item.questionCount }}</div>
            <div class="font-desc">总分：{{ item.score }}</div>
            <div class="font-desc">时长：{{ item.suggestTime }}分钟</div>
            <div class="font-desc">开始时间：{{ item.limitStartTime }}</div>
            <div class="font-desc">结束时间：{{ item.limitEndTime }}</div>
            <div style="margin-top: 10px; text-align: right">
              <!-- <el-button @click="$router.push(`/do?id=${item.id}`)" size="mini" -->
              <el-button
                @click="startExam(item.id, item.courseName)"
                size="mini"
                >开始答题</el-button
              >
            </div>
          </div>
        </div>
      </div>
      <div style="text-align: center" v-if="total > 10">
        <el-pagination
          :current-page.sync="current"
          layout="total, prev, pager, next"
          :total="total"
          @current-change="getExamList"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog
      :title="'《 ' + scoreTitle + ' 》——考试成绩'"
      :visible.sync="scoreDialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <div class="answer-body" v-if="examScoreInfo">
        <div class="answer-item">
          <div class="font-desc">标题：{{ examScoreInfo.paperName }}</div>
          <div class="font-desc">提交时间：{{ examScoreInfo.createTime }}</div>
          <div class="font-desc">
            作业状态：
            <el-tag v-if="examScoreInfo.status == 1" type="warning"
              >待判分</el-tag
            >
            <el-tag v-if="examScoreInfo.status == 2" type="success"
              >完成</el-tag
            >
          </div>
        </div>
        <div class="answer-item">
          <div class="font-desc">
            作业类型：
            <span v-if="examScoreInfo.paperType == 1"> 课堂作业 </span>
            <span v-if="examScoreInfo.paperType == 2"> 考试</span>
          </div>
          <div class="font-desc">
            题目数量：{{ examScoreInfo.questionCount }}
          </div>
          <div class="font-desc">作业总分：{{ examScoreInfo.paperScore }}</div>
        </div>
        <div class="answer-item">
          <div class="font-desc">
            正确题数：{{ examScoreInfo.questionCorrect }}
          </div>
          <div class="font-desc">自动批改：{{ examScoreInfo.systemScore }}</div>
          <div class="font-desc">最终得分：{{ examScoreInfo.userScore }}</div>
          <div class="font-desc">耗时：{{ examScoreInfo.doTime }}</div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="scoreDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="showScoreDialogClick"
          >查看试卷</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
// import cardWipe from "@/components/common/card-wipe.vue";
import eduApi from "@/api/edu.js";
import None from "@/components/common/no-databox.vue";
export default {
  data() {
    return {
      current: 1,
      total: 0,
      search: {
        courseId: "",
        paperType: 1,
      },
      courseList: [],
      examList: [],
      scoreDialogVisible: false,
      examScoreInfo: {},
      scoreTitle: "",
    };
  },
  watch: {
    search: {
      handler() {
        this.getExamList();
      },
      deep: true,
      immediate: true,
    },
  },
  components: {
    None,
    // cardWipe,
  },
  created() {
    this.getUsCourseList();
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    showScoreDialogClick() {
      this.$router.push(`/read?id=${this.examScoreInfo.id}`);
    },
    startExam(examId, courseName) {
      // console.log(examId);
      eduApi.isAnswerSubmit(examId).then((res) => {
        if (res.code == 20000) {
          if (res.data.items && res.data.items.id) {
            // this.$message.error(res.message);
            this.scoreTitle = courseName;
            this.examScoreInfo = res.data.items;
            this.scoreDialogVisible = true;
          } else {
            this.$message.success(res.message);
            this.$router.push(`/do?id=${examId}`);
          }
        }
      });
    },
    getExamList() {
      eduApi.getByExam(this.search, this.current).then((res) => {
        if (res.code == 20000) {
          this.examList = res.data.items;
        }
      });
    },
    getUsCourseList() {
      eduApi.getCourseByList().then((res) => {
        if (res.code == 20000) {
          this.courseList = res.data.items;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.msg {
  text-align: center;
  min-height: 300px;
  width: 100%;
  display: table;
}
.examctx {
  padding: 39px;
  .card-exam-list {
  }
  .card-exam-item {
    float: left;
    width: 210px;
    margin: 0 30px 30px 0;
    padding: 20px;
    background: #f5f7fa;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
      rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
    transition: all 0.1s;
    .card-exam-box {
      text-align: left;
      font-size: 16px;
      line-height: 30px;
      .font-desc {
        font-size: 14px;
        color: #9b9b9b;
      }
    }

    &:hover {
      -webkit-box-shadow: 0 4px 4px 1px #e0ecfb;
      box-shadow: 0 4px 4px 1px #e0ecfb;
      -webkit-transform: translateY(-6px);
      transform: translateY(-6px);
      background: #fff;
    }
  }
  .examctx-header {
    margin-bottom: 30px;
    .item-contain {
      display: flex;
      margin-bottom: 10px;
      .title {
        font-size: 14px;
        font-weight: 400;
        color: #000000d9;
        line-height: 24px;
        display: inline-block;
        width: 85px;
        vertical-align: top;
        margin-top: 2px;
        text-align: right;
      }
    }
  }
}
.answer-body {
  padding: 5px;
  display: flex;
  flex-direction: row;
  .answer-item {
    text-align: left;
    flex: 1;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    padding: 10px 20px 10px 20px;
    line-height: 40px;
  }
}
</style>
