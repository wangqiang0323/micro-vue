import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/QuillDemo.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
];

export default routes;
