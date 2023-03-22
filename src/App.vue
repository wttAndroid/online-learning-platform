<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    // this.$router.beforeEach((to, from, next) => {
    //   console.log("跳转的路径", to.path);
    //   next();
    // });
  },
};
</script>

<style>
@import "./assets/css/normalize.css";
@import "./assets/css/theme.css";
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #303133;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #303133;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
