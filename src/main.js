import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import "@/assets/css/common.less";
// import "../src/assets/css/common.less";
// import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import './assets/css/element-variables.scss'
import './assets/fonts/iconfont/iconfont.css'
import './assets/fonts/iconfont/iconfont.js'
// import 'element-ui/lib/theme-chalk/index.css'
import '@/utils/date.js'

import VMdPreview from '@kangc/v-md-editor/lib/preview';
import VueMarkdownEditor  from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
// import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
// import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

import hljs from 'highlight.js';
// import json from 'highlight.js/lib/languages/json';
// hljs.registerLanguage('json', json);

VueMarkdownEditor.use(githubTheme, {
  Hljs: hljs,
});
VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

Vue.use(VueMarkdownEditor);
Vue.use(VMdPreview);
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
