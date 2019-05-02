<template>
  <div class="flex">
    <div class="flex">
      <div
        class="pointer-events-none flex items-center px-2 z-10 text-grey-darker"
      >
        <DollarIcon size="6" />
      </div>
      <input
        id="exchange"
        v-model.number="exchange"
        class="appearance-none bg-grey-lighter -ml-10 text-grey-darkest border border-grey-lighter rounded py-3 pl-8 pr-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
        :class="{
          'bg-red-lighter border-red-light': exchangeHasErrors && !exchange
        }"
      />
    </div>
    <div
      class="pointer-events-none flex items-center px-2 text-white text-sm uppercase font-bold"
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
  computed: {
    exchange: {
      get() {
        return this.$store.state.exchange.value;
      },
      set(value) {
        this.$store.commit("updateExchange", value);
      }
    },
    ...mapState({
      exchangeHasErrors: state => state.exchange.errors
    })
  }
};
</script>
