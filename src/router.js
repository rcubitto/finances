import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Balance from "./views/Balance";
import Entries from "./views/Entries";
import Monotribute from "./views/Monotribute";

export default new Router({
  routes: [
    {
      path: "/",
      name: "Entries",
      component: Entries
    },
    {
      path: "/calculator",
      name: "Balance",
      component: Balance
    },
    {
      path: "/monotribute",
      name: "Monotribute",
      component: Monotribute
    }
  ]
});
