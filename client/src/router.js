import Vue from "vue";
import Router from "vue-router";

import Dashboard from "./components/dashboard/Dashboard.vue";
import Signin from "./components/auth/Signin.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/dashboard",
      component: Dashboard,
      name: "dashboard"
    },
    {
      path: "/signin",
      component: Signin,
      name: "signin"
    },
    {
      path: "*",
      redirect: {
        name: "dashboard"
      }
    }
  ]
});
