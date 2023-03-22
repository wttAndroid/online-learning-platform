<template>
  <div>
    <!-- 定义播放器dom -->
    <div class="prism-player" id="J_prismPlayer"></div>
  </div>
</template>
<script>
import edu from "@/api/edu";
import oss from "@/api/oss";
export default {
  // asyncData({ params, error }) {
  //   return edu.getPlayAuth(params.vid).then((response) => {
  //     return {
  //       playAuth: response.data.data.playAuth,
  //       vid: params.vid,
  //     };
  //   });
  // },
  data() {
    return {};
  },
  mounted() {
    // 先获取当前进度
    if (this.$route.params && this.$route.params.vid) {
      //获取视频凭证
      oss.getVideoPlayAuth(this.$route.params.vid).then((ress) => {
        if (ress.code == 20000) {
          edu.learnprogress(this.$route.params.vid).then((res) => {
            if (res.code == 20000 && res.data.items.length > 0) {
              this.initPlayer(
                this.$route.params.vid,
                ress.data.vid,
                ress.data.auth,
                res.data.items[0].current
              );
            } else {
              this.initPlayer(
                this.$route.params.vid,
                ress.data.vid,
                ress.data.auth
              );
            }
          });
        } else {
          this.$message.error("没有获取视频的权限");
        }
      });
    }
  },
  methods: {
    initPlayer(videoId, vid, playauth, current = 0) {
      // console.log(playauth);
      var player = new Aliplayer(
        {
          id: "J_prismPlayer",
          vid: vid,
          playauth: playauth,
          width: "100%",
          height: "500px",
          autoplay: true,
          preload: false,
          isLive: false,
        },
        function (player) {
          if (current) {
            //获取之前的进度
            player.seek(current);
          }
          console.log("播放器创建成功了！！！", current);

          // 进度条拖拽开始，不可以前进，可以后退
          let start = true;
          let startProgress = 0;
          let endProgress = 0;
          player.on("startSeek", (e) => {
            if (start) {
              start = false;
              startProgress = player.getCurrentTime();
            }
            player.pause();
          });
          //阿里播放器拖动【结束】拖动时，不可以前进，可以后退
          player.on("completeSeek", (e) => {
            start = true;
            endProgress = player.getCurrentTime();
            if (endProgress < startProgress) {
              player.seek(endProgress);
            } else {
              player.seek(startProgress);
            }
            player.play();
          });

          player.on("ended", function (e) {
            console.log("播放结束");
            handleReady();
          });
          player.on("pause", function (e) {
            console.log("播放暂停");
            handleReady();
          });
          player.on("error", function (e) {
            console.log("播放错误");
            handleReady();
          });

          function handleReady() {
            edu
              .upProgress({
                current: player.getCurrentTime(),
                videoId: videoId,
              })
              .then((res) => {
                // console.log(res);
              });
          }
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.prism-player {
  margin: 50px 0;
}
</style>
