import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Balance from "./views/Balance";
import Entries from "./views/Entries";
import AFIP from "./views/AFIP";

export default new Router({
  routes: [
    {
      path: "/",
      name: "Balance",
      component: Balance
    },
    {
      path: "/entries",
      name: "Entries",
      component: Entries
    },
    {
      path: "/afip",
      name: "AFIP",
      component: AFIP
    }
  ]
});
