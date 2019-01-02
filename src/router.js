import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Salary from "./views/Salary";
import Balance from "./views/Balance";

export default new Router({
  routes: [
    {
      path: "/",
      name: "Salary",
      component: Salary
    },
    {
      path: "/balance",
      name: "Balance",
      component: Balance
    }
  ]
});
