<template>
  <div class="mt-6 flex">
    <div class="flex-1 mr-6">
      <label
        class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
        for="exchange"
      >
        ARS/USD
      </label>
      <div class="relative">
        <DollarIcon />
        <input
          id="exchange"
          v-model.number="exchange"
          class="appearance-none block w-full bg-grey-lighter text-grey-darkest border border-grey-lighter rounded py-3 pl-8 pr-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
          :class="{ 'border-red': exchangeHasErrors && ! exchange }"
          type="number"
        >
      </div>
      <p
        v-if="exchangeHasErrors && ! exchange"
        class="text-red text-xs italic mt-1"
      >
        An error has occurred, please fill this field manually.
      </p>
    </div>
    <div class="flex-1 mr-6">
      <label
        class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
        for="income"
      >
        Income [U$D]
      </label>
      <div class="flex relative">
        <DollarIcon />
        <input
          id="income"
          ref="income"
          v-model.number="income"
          autofocus
          class="appearance-none block w-full bg-grey-lighter text-grey-darkest border border-grey-lighter rounded py-3 pl-8 pr-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
          type="number"
        >
      </div>
    </div>
    <div class="flex flex-col justify-center mr-6">
      <label class="cursor-pointer uppercase tracking-wide text-grey-darker text-xs font-bold">
        <input
          v-model="range"
          type="radio"
          value="monthly"
          class="mr-1"
        >Monthly
      </label>
      <label class="cursor-pointer uppercase tracking-wide text-grey-darker text-xs font-bold mt-2">
        <input
          v-model="range"
          type="radio"
          value="yearly"
          class="mr-1"
        >Yearly
      </label>
    </div>
    <div class="flex flex-col justify-center">
      <label class="cursor-pointer uppercase tracking-wide text-grey-darker text-xs font-bold">
        <input
          v-model="margin"
          type="radio"
          value="gross"
          class="mr-1"
        >Gross
      </label>
      <label class="cursor-pointer uppercase tracking-wide text-grey-darker text-xs font-bold mt-2">
        <input
          v-model="margin"
          type="radio"
          value="net"
          class="mr-1"
        >Net
      </label>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import DollarIcon from "@/components/shared/DollarIcon";

export default {
  components: { DollarIcon },
  computed: {
    exchange: {
      get() {
        return this.$store.state.exchange.value;
      },
      set(value) {
        this.$store.commit("updateExchange", value);
      }
    },
    income: {
      get() {
        return this.$store.state.income.value;
      },
      set(value) {
        this.$store.commit("updateIncomeValue", value);
      }
    },
    range: {
      get() {
        return this.$store.state.income.range;
      },
      set(value) {
        this.$store.commit("updateIncomeRange", value);
      }
    },
    margin: {
      get() {
        return this.$store.state.income.margin;
      },
      set(value) {
        this.$store.commit("updateIncomeMargin", value);
      }
    },
    ...mapState({
      exchangeHasErrors: state => state.exchange.errors
    })
  },
  created() {
    document.addEventListener("keyup", e => {
      switch (e.key) {
        case "/":
          this.$refs.income.focus();
          break;
        case "m":
          this.range = "monthly";
          break;
        case "y":
          this.range = "yearly";
          break;
        case "g":
          this.margin = "gross";
          break;
        case "n":
          this.margin = "net";
          break;
      }
    });
  },
  methods: {
    ...mapActions(["fetchExchange"])
  }
};
</script>
