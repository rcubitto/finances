import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Balance from "./views/Balance";
import IncomeOutcome from "./views/IncomeOutcome";
import AFIP from "./views/AFIP";

export default new Router({
  routes: [
    {
      path: "/",
      name: "Balance",
      component: Balance
    },
    {
      path: "/balance",
      name: "In / Out",
      component: IncomeOutcome
    },
    {
      path: "/afip",
      name: "AFIP",
      component: AFIP
    }
  ]
});
