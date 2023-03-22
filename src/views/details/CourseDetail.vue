<template>
  <div class="coursedetail">
    <div class="center-content">
      <!-- 当前位置 -->
      <header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">选修课</el-breadcrumb-item>
          <el-breadcrumb-item>课程详情</el-breadcrumb-item>
          <el-breadcrumb-item>{{ course && course.title }}</el-breadcrumb-item>
        </el-breadcrumb>
      </header>

      <!-- 课程页面 -->
      <div class="play-page clearfix" v-if="course">
        <div class="play-page-left">
          <img :src="course.cover" :alt="course.title" />
          <!-- <video
            controls="controls"
            src="https://education-prod-1253719016.cos.ap-nanjing.myqcloud.com/videos/2022/09/23/175126-784789d07ed244be88024830d39d3bb1.mp4"
          ></video> -->
        </div>
        <div class="play-page-info">
          <p
            title="Spring&nbsp;Boot实战入门—黑马分布式网盘系统开发"
            class="title ellipsis"
          >
            {{ course.title }}
          </p>
          <div class="author">讲师：{{ teacher.teacherName }}</div>
          <div class="courseContent">
            <p>课程描述：</p>
            <!-- <span class="courseContent-txt">{{ course.description }}</span> -->
          </div>
          <ul class="courseinfo clearfix">
            <li>
              课时数
              <p>{{ course.lessonNum }}节</p>
            </li>
            <li>
              学分
              <p>{{ course.credit }}分</p>
            </li>
            <li>
              限制人数
              <p>{{ course.limitCount }}人</p>
            </li>
          </ul>
          <div style="text-align: center; margin-top: 50px">
            <el-button v-if="!isJoin" @click="joinClick()" plain
              >加入选修课程</el-button
            >
          </div>
        </div>
      </div>
      <!-- 课程详情 -->
      <div class="play-detail clearfix" v-if="course">
        <div class="play-detail-left">
          <el-tabs v-model="tabActive">
            <el-tab-pane label="课程介绍" name="课程介绍">
              <div class="playdetail-ctx">
                <div v-html="course.description">{{ course.description }}</div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="课件下载" name="课件下载" v-if="isJoin">
              <p>扫描网盘获取学习资料</p>
              <img :src="course.courseware" alt="" />
            </el-tab-pane>
            <el-tab-pane label="课程大纲" name="课程大纲" v-if="isJoin">
              <div class="catalog-ctx">
                <el-collapse :model="chapterActive" accordion>
                  <el-collapse-item
                    v-for="item in chapter"
                    :key="item.id"
                    :title="item.title"
                    :name="item.id + ''"
                  >
                    <div
                      class="catalog-item"
                      :class="item.state == 1 ? 'finish' : 'active'"
                      v-for="item2 in item.children"
                      :key="item2.id"
                    >
                      <!-- @click="$router.push('/player/' + item2.videoSourceId)" -->

                      <router-link :to="'/player/' + item2.id" target="_blank">
                        {{ item2.title }}

                        <el-tag type="success" v-if="videoStatus(item2.id) == 1"
                          >已完成</el-tag
                        >
                      </router-link>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </el-tab-pane>
            <el-tab-pane label="课程作业" name="课程作业" v-if="isJoin">
              <div class="item-contain">
                <div class="item-radio">
                  <el-radio-group v-model="search.paperType" size="mini">
                    <el-radio-button label="1">随堂练习</el-radio-button>
                    <el-radio-button label="2">考试试卷</el-radio-button>
                  </el-radio-group>
                </div>
              </div>
              <div class="card-exam-list clearfix">
                <None v-if="!examList || examList.length < 1" />
                <div
                  class="card-exam-item"
                  v-for="item in examList"
                  :key="item.id"
                >
                  <div class="card-exam-box">
                    <div class="clearfix">
                      <div style="float: left">
                        <div class="ellipsis">{{ item.name }}</div>
                        <div class="font-desc">学科：{{ item.courseName }}</div>
                        <div class="font-desc">
                          讲师：{{ item.createUserName }}
                        </div>
                        <div class="font-desc">
                          题目数：{{ item.questionCount }}
                        </div>
                      </div>
                      <div style="float: right">
                        <div class="font-desc">总分：{{ item.score }}</div>
                        <div class="font-desc">
                          时长：{{ item.suggestTime }}分钟
                        </div>
                        <div class="font-desc">
                          开始时间：{{ item.limitStartTime }}
                        </div>
                        <div class="font-desc">
                          结束时间：{{ item.limitEndTime }}
                        </div>
                      </div>
                    </div>

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
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="play-detail-right">
          <div class="right-mok">
            <p class="title">讲师介绍</p>
            <div
              class="info-box"
              @click="$router.push(`/teacherDetail?id=${teacher.teacherId}`)"
            >
              <div class="info">
                <!-- <img style="width: 50px" :src="teacher.avatar" alt="" /> -->
                <img style="width: 50px" :src="teacher.avatar" alt="" />
                <div class="info-author">
                  <span>{{ teacher.teacherName }}</span>
                  <p>{{ teacher.career }}</p>
                </div>
              </div>
              <div class="text">{{ teacher.intro }}</div>
            </div>
          </div>
        </div>
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
import eduApi from "@/api/edu.js";
import { mapState } from "vuex";
import None from "@/components/common/no-databox.vue";
export default {
  data() {
    return {
      tabActive: "课程介绍",
      chapterActive: "1",
      classChapter: [],
      chapter: [],
      course: null,
      teacher: null,
      videoListProgress: [],
      search: {
        courseId: "",
        paperType: 1,
      },
      current: 1,
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
  },
  computed: {
    ...mapState({ userInfo: (state) => state.user }),
    isJoin() {
      return this.userInfo.token && this.chapter;
    },
    videoStatus() {
      return function (vid) {
        let video = this.videoListProgress.find((e) => e.videoId == vid);
        if (video) return video.status;
        return null;
      };
    },
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
    joinClick() {
      if (this.$route.query && this.$route.query.id) {
        eduApi.joinElective(this.$route.query.id).then((res) => {
          if ((res.code = 20000)) {
            this.$message.success(res.message);
            location.reload();
          } else {
            this.$message.error(res.message);
          }
        });
      } else {
        this.$$message.error("请先选择课程");
      }
    },
    getExamList() {
      this.search.courseId = this.$route.query.id;
      eduApi.getByExam(this.search, this.current).then((res) => {
        if (res.code == 20000) {
          this.examList = res.data.items;
        }
      });
    },
    getCourseDetail(id) {
      eduApi.getCourseInfo(id).then((res) => {
        if (res.code == 20000) {
          // console.log(res);
          this.chapter = res.data.chapter ? res.data.chapter : null;
          this.course = res.data.course;
          this.teacher = res.data.teacher;
        }
      });
    },
    getProgress() {
      eduApi.learnprogress().then((res) => {
        this.videoListProgress = res.data.items;
      });
    },
  },
  created() {
    if (this.$route.query && this.$route.query.id) {
      this.getCourseDetail(this.$route.query.id);
      // this.getProgress(this.$route.query.id);
      this.getProgress();
      this.getExamList();
    }
  },
};
</script>
<style lang="scss">
.coursedetail .el-collapse-item__content {
  padding-bottom: 0px;
  padding-left: 15px;
}
.coursedetail .el-collapse-item__header {
  background-color: #fcfcfc;
  padding: 0px 10px;
}
.coursedetail {
  width: 100%;
  background-color: #f7f7f7;
  overflow: hidden;
  padding-bottom: 80px;
  .center-content {
    height: 100%;
    min-height: 800px;
    padding-top: 20px;
  }
  .card-exam-box {
    text-align: left;
    font-size: 14px;
    line-height: 30px;
    border-bottom: 1px solid #f7f7f7;
    padding: 10px;
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
}
header {
  margin-bottom: 20px;
}
.play-page {
  .play-page-left {
    position: relative;
    float: left;
    width: 910px;
    height: 570px;
    background-color: #000;
    overflow: hidden;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    & > img {
      width: 100%;
      height: 100%;
    }
    & > video {
      width: 100%;
      height: 100%;
    }
  }
  .play-page-info {
    float: right;
    width: 290px;
    height: 570px;
    background-color: #1b1d25;
    color: #fff;
    padding: 18px 10px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    .title {
      font-size: 16px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .courseContent {
      padding: 18px 0;
      font-size: 12px;
      border-bottom: 1px solid #333;
      word-break: break-all;
      word-wrap: break-word;
      p {
        color: #ccc;
      }
      .courseContent-txt {
        font-size: 12px;
        color: #999;
        line-height: 22px;
        display: inline-block;
        margin-top: 3px;
        text-indent: 2px;
        word-break: break-all;
        word-wrap: break-word;
      }
    }
    .courseinfo {
      border-bottom: 1px solid #333;
      padding: 16px 0;

      li {
        float: left;
        width: 70px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        text-align: center;
        &:nth-child(2) {
          text-align: center;
          width: 100px;
          margin: 0 10px;
        }
        p {
          font-size: 14px;
          color: #999;
          margin-top: 12px;
          text-align: center;
        }
      }
    }
    .author {
      margin-top: 20px;
      border-bottom: 1px solid #333;
      padding-bottom: 18px;
    }
  }
}

.play-detail {
  margin-top: 20px;
  box-sizing: content-box;
  .play-detail-left {
    float: left;
    padding: 13px;
    box-sizing: border-box;
    width: 890px;
    background-color: #fff;
    .playdetail-ctx {
      padding: 20px 30px;
      min-height: 686px;
      line-height: 22px;
      word-break: break-all;
      word-wrap: break-word;
      img {
        width: 100%;
      }
    }
    .catalog-ctx {
      padding: 20px;
      .catalog-item {
        cursor: pointer;
        padding: 10px;
        border-bottom: 1px solid #f8f8f8;
        i {
          margin-left: 15px;
          font-size: 12px;
          vertical-align: middle;
          margin-bottom: 2px;
        }
        &:hover {
          background: #f0f6ff;
        }
        &.finish {
          i {
            color: #52cc5c;
          }
        }
        &.active {
          i {
            color: $theme-color-font;
          }
        }
      }
    }
  }
  .play-detail-right {
    float: right;
    width: 290px;
    .right-mok {
      background-color: #fff;
      .title {
        padding: 17px 20px;
        font-size: 16px;
        border-bottom: 1px solid #e5e5e5;
      }
      .info-box {
        cursor: pointer;
        padding: 15px 20px;
        font-size: 14px;
        color: #333;
        .text {
          text-indent: 28px;
          line-height: 24px;
          margin: 15px 0px;
        }
        .info {
          display: flex;
          align-items: center;
          .info-author {
            margin-left: 10px;
            line-height: 25px;
            span {
              font-weight: bold;
            }
            p {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>
