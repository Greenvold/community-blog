import Vue from "vue";

import Router from "vue-router";

import Login from "./views/Login.vue";

import SignUp from "./views/SignUp.vue";

import Home from "./components/Home.vue";

import Article from "./views/Article.vue";

import CreateArticle from "./views/CreateArticle.vue";
Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      component: Login
    },
    {
      path: "/signup",
      component: SignUp
    },
    {
      path: "/",
      component: Home
    },
    {
      path: "/article/:id",
      component: Article
    },
    {
      path: "/articles/create",
      component: CreateArticle
    }
  ]
});

export default router;
