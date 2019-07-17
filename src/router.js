import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Calculator from "./views/Calculator";
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
      name: "Calculator",
      component: Calculator
    },
    {
      path: "/monotribute",
      name: "Monotribute",
      component: Monotribute
    }
  ]
});
