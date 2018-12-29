<template>
  <div id="app">
    <Header />
    <PayPalNubi />
  </div>
</template>

<script>
import "./assets/css/styles.css";

import Header from "./components/shared/Header";
import PayPalNubi from "./components/PayPalNubi";

export default {
  name: "App",
  components: { Header, PayPalNubi }
};
</script>
