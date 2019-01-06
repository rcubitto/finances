import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Balance from "./views/Balance";
import InOutCome from "./views/InOutCome";
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
      component: InOutCome
    },
    {
      path: "/afip",
      name: "AFIP",
      component: AFIP
    }
  ]
});
