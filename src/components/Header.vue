<template>
  <div class="bg-indigo-dark">
    <div class="container mx-auto">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <LogoIcon />
          <h1
            class="text-indigo-lightest text-xl font-normal flex items-center"
          >
            Financial Control
          </h1>
          <div class="flex ml-10">
            <RouterLink
              v-for="(route, index) in routes"
              :key="index"
              :to="route.path"
              class="text-indigo-lighter no-underline uppercase text-xs hover:text-indigo-lightest hover:bg-indigo px-4 py-6"
            >
              {{ route.name }}
            </RouterLink>
          </div>
        </div>
        <DollarExchange />
      </div>
    </div>
  </div>
</template>

<script>
import Router from "../router";
import LogoIcon from "@/components/LogoIcon";
import DollarExchange from "@/components/DollarExchange";

export default {
  components: { DollarExchange, LogoIcon },
  computed: {
    routes() {
      return Router.options.routes;
    }
  }
};
</script>
