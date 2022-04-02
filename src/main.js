import Vue from 'vue';
import TDesign from 'tdesign-vue';

// 引入组件库全局样式资源
import 'tdesign-vue/es/style/index.css';
import './index.css';
import Demo from './demo.vue';
import Vuex from 'vuex';

const state = {
  count: 0,
};

const mutations = {
  add(state) {
    state.count++;
  },
  reduce(state) {
    state.count--;
  },
};

VUe.use(
  new Vuex.Store({
    state,
    mutations,
  })
);

Vue.use(TDesign);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Demo),
}).$mount('#app');
