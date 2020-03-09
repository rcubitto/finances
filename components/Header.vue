<template>
  <div class="bg-indigo-700">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <LogoIcon />
          <h1 class="text-indigo-100 text-xl font-normal flex items-center">
            Financial Control
          </h1>
          <div class="flex ml-10">
            <nuxt-link
              v-for="(route, index) in routes"
              :key="index"
              :to="route.path"
              class="text-indigo-300 no-underline uppercase text-xs hover:text-indigo-100 hover:bg-indigo-600 px-4 py-5"
            >
              {{ route.name }}
            </nuxt-link>
          </div>
        </div>
        <DollarExchange />
      </div>
    </div>
  </div>
</template>

<script>
import LogoIcon from "@/components/LogoIcon";
import DollarExchange from "@/components/DollarExchange";

export default {
  components: { DollarExchange, LogoIcon },
  data() {
    return {
      routes: [
        { path: "/", name: "Entries" },
        { path: "/calculator", name: "Calculator" },
        { path: "/monotribute", name: "Monotribute" }
      ]
    };
  }
};
</script>
