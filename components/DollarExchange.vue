<template>
  <div class="flex w-1/6 relative">
    <div class="flex">
      <div
        class="pointer-events-none flex items-center px-2 z-10 text-gray-800"
      >
        <DollarIcon size="8" />
      </div>
      <input
        v-model.number="exchange"
        class="w-full appearance-none bg-gray-200 text-xl text-gray-700 border border-gray-300 rounded py-2 pl-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        :class="{
          'bg-red-300 border-red-400': false // ||(exchangeHasErrors && !exchange)
        }"
      />
    </div>
    <div
      class="absolute right-0 pointer-events-none px-2 text-gray-600 text-sm uppercase mr-2"
      style="top: 11px;"
    >
      ARS/USD
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import DollarIcon from "@/components/DollarIcon";

export default {
  components: { DollarIcon },
  data() {
    return {
      exchange: 76
    };
  }
  // computed: {
  //   exchange: {
  //     get() {
  //       return  this.$store.state.exchange.value;
  //     },
  //     set(value) {
  //       this.$store.commit("updateExchange", value);
  //     }
  //   },
  //   ...mapState({
  //     exchangeHasErrors: state => state.exchange.errors
  //   })
  // }
};
</script>
