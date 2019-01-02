<template>
  <div class="container mx-auto">
    <IncomeInputs />
    <IncomeDetails />
  </div>
</template>

<script>
import IncomeInputs from "../components/IncomeInputs";
import IncomeDetails from "../components/IncomeDetails";

export default {
  components: { IncomeInputs, IncomeDetails }
};
</script>
