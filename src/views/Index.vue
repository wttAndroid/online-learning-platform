<template>
  <div>
    <header-common />
    <router-view />
    <footer-common />
    <el-backtop :bottom="100" :visibility-height="50"></el-backtop>
  </div>
</template>

<script>
import headerCommon from "../components/common/header-common.vue";
import footerCommon from "../components/common/footer-common.vue";

// import mainCommon from './common/main-common'
// import footerCommon from './common/footer-common'
export default {
  name: "index",
  components: { headerCommon, footerCommon },
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style >
</style>

