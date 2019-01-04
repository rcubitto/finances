<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import "./assets/css/styles.css";
import Header from "@/components/Header";

export default {
  name: "App",
  components: { Header }
};
</script>
