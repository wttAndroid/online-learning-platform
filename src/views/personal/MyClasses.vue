<template>
  <div>
    <div class="tab-title-box">
      <span class="tab-item">我的课程</span>
    </div>
    <div class="tab-content-box clearfix">
      <div class="class-box clearfix">
        <div class="class-item" v-for="item in classList" :key="item.id">
          <div class="course-box">
            <div class="course-box-img"></div>
            <div class="course-box-info">
              <div class="course-info">
                <p class="course-info-title">
                  <i class="el-icon el-icon-tickets"></i>
                  课程名称:
                </p>
                <p class="course-info-txt">{{ item.classname }}</p>
              </div>

              <div class="course-info">
                <p class="course-info-title">
                  <i class="el-icon el-icon-tickets"></i>
                  教师名称:
                </p>
                <p class="course-info-txt">{{ item.teachername }}</p>
              </div>

              <div class="course-info">
                <p class="course-info-title">
                  <i class="el-icon el-icon-tickets"></i>
                  章节数:
                </p>
                <p class="course-info-txt">{{ item.count1 }}</p>
              </div>
              <div class="course-info">
                <p class="course-info-title">
                  <i class="el-icon el-icon-tickets"></i>
                  选修人数:
                </p>
                <p class="course-info-txt">{{ item.count2 }}</p>
              </div>
            </div>
          </div>
          <div class="course-btn-box">
            <button
              @click="$router.push('/courseDetail?id=1')"
              type="button"
              class="el-button el-button--primary el-button--small"
            >
              进入课堂
            </button>
          </div>
        </div>
      </div>
      <div
        style="
          position: absolute;
          bottom: 50px;
          left: 50%;
          transform: translateX(-50%);
        "
      >
        <el-pagination
          :page-size="100"
          layout="total, prev, pager, next"
          :total="1000"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      classList: [
        {
          id: 1,
          classname: "Spring Boot企业级开发教程",
          teachername: "张三",
          count1: 10,
          count2: 10,
        },
        {
          id: 2,
          classname: "Spring Boot企业级开发教程",
          teachername: "张三",
          count1: 10,
          count2: 10,
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.tab-title-box {
  display: flex;
  height: 51px;
  line-height: 51px;
  border-bottom: 1px solid #e2e2e2;
  background: #ebeef5;

  .tab-item {
    margin-left: 40px;
    color: $theme-color-font;
    line-height: 51px;
    height: 52px;
    min-width: 65px;
    padding: 0 15px;
    text-align: center;
    cursor: pointer;
    font-size: 18px;
    float: left;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-top: 2px solid $theme-color-font;
    background: #fff;
  }
}
.tab-content-box {
  background: #fff;
  .class-box {
    padding-bottom: 100px;
    .class-item {
      float: left;
      margin-top: 30px;

      width: 315px;
      float: left;
      border: 1px solid #ebeef5;
      border-radius: 4px;
      margin-left: 15px;
      margin-top: 30px;

      .course-btn-box {
        height: 50px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }
      .course-box {
        padding: 16px 10px;
        background: #f5f7fa;
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        .course-box-img {
          width: 80px;
          height: 106px;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          background-image: url(https://attachment-center.boxuegu.com/data/picture/univ/2019/11/05/17/53b9b13f0b8f49028e456dae28fa8038.png);
        }
        .course-box-info {
          padding-left: 24px;
          flex-direction: column;
          justify-content: space-around;
          display: -ms-flexbox;
          flex: 1;
          display: flex;
          line-height: 25px;

          .course-info {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            .course-info-title {
              width: 70px;
              text-align: left;
              padding-right: 5px;
              color: #909399;
              font-size: 12px;
              i {
                font-size: 15px;
              }
            }
            .course-info-txt {
              color: #606266;
              width: 115px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
}
</style>
