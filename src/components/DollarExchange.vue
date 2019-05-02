<template>
  <div>
    <label
      class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
      for="exchange"
    >
      ARS/USD
    </label>
    <div class="relative">
      <div
        class="pointer-events-none absolute pin-y pin-l flex items-center px-2 text-grey-darker"
      >
        <DollarIcon size="6" />
      </div>
      <input
        id="exchange"
        v-model.number="exchange"
        class="appearance-none block w-full bg-grey-lighter text-grey-darkest border border-grey-lighter rounded py-3 pl-8 pr-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
        :class="{ 'border-red': exchangeHasErrors && !exchange }"
        type="number"
      />
    </div>
    <p
      v-if="exchangeHasErrors && !exchange"
      class="text-red text-xs italic mt-1"
    >
      An error has occurred, please fill this field manually.
    </p>
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
