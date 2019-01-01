<template>
  <div id="app">
    <Header />
    <IncomeInputs />
    <IncomeDetails />
  </div>
</template>

<script>
import "./assets/css/styles.css";

import Header from "./components/shared/Header";
import IncomeInputs from "./components/IncomeInputs";
import IncomeDetails from "./components/IncomeDetails";

export default {
  name: "App",
  components: { Header, IncomeInputs, IncomeDetails }
};
</script>
