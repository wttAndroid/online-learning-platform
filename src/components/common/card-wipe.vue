<template>
  <div class="flip-container card-wipe" @focus="hoverEvent">
    <div class="flipper">
      <div class="front">
        <div class="font-hidden">20200908卷</div>
        <div class="font-desc">考试时长：30分钟</div>
        <div class="font-desc">开始时间：2020-09-22 00:00:00</div>
        <div class="font-desc">结束时间：2024-10-31 00:00:00</div>
      </div>
      <div class="back">
        <img
          src="http://scykt-file.oss-cn-shanghai.aliyuncs.com/2023/01/28/1a93dacc0a104215b60952971a62b745default.jpg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    hoverEvent() {},
  },
};
</script>

<style lang="scss" scoped>
.card-wipe {
  height: 150px;
  .front {
    text-align: left;
    display: flex;
    flex-direction: column;
    .font-desc {
      margin: 5px 0;
    }
  }
  .back {
    cursor: pointer;
    position: relative;
    background-color: #eff0f2;
    overflow: hidden;
    height: 150px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.flip-container {
  perspective: 1000;
}
.flip-container:hover .flipper,
.flip-container.hover .flipper {
  transform: rotateY(180deg);
}

.flip-container,
.front,
.back {
  width: 180px;
}

.flipper {
  transition: 0.6s;
  transform-style: preserve-3d;
  position: relative;
}

.front,
.back {
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
}

.front {
  z-index: 2;
}

.back {
  transform: rotateY(180deg);
}
</style>
