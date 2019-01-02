import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Salary",
      component: () => import("./views/Salary.vue")
    },
    {
      path: "/balance",
      name: "Balance",
      component: () => import("./views/Balance.vue")
    }
  ]
});
