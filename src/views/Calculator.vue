<template>
  <div class="container mx-auto mt-12">
    <div class="w-1/3 mx-auto">
      <!-- PayPal Payment -->
      <div>
        <label
          class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          for="amount"
        >PayPal Payment</label>
        <div class="flex relative">
          <div
            class="pointer-events-none absolute pin-y pin-l flex items-center px-3 text-grey-darker"
          >
            <DollarIcon size="6" />
          </div>
          <input
            id="amount"
            v-model.number="amount"
            autofocus
            class="appearance-none block w-full bg-grey-lighter text-grey-darkest border border-grey-lighter rounded py-4 pl-10 pr-6 leading-tight focus:outline-none focus:bg-white focus:border-grey"
            type="text"
          />
        </div>
      </div>
      <div v-if="amount">
        <!-- PayPal Fee -->
        <div class="mt-10">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          >PayPal Fee (5.4% – 0.3)</label>
          <div class="flex relative">
            <div
              class="pointer-events-none absolute pin-y pin-l flex items-center px-3 text-grey-darker"
            >
              <DollarIcon size="6" />
            </div>
            <input
              :value="payPalFee.toFixed(2)"
              class="appearance-none block w-full bg-red-lightest text-grey-darkest border border-grey-lighter rounded py-4 pl-10 pr-6 leading-tight focus:outline-none focus:bg-white focus:border-grey"
              type="text"
              :disabled="true"
            />
          </div>
        </div>
        <!-- PayPal Credit  -->
        <div class="mt-10">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          >PayPal Credit</label>
          <div class="flex relative">
            <div
              class="pointer-events-none absolute pin-y pin-l flex items-center px-3 text-grey-darker"
            >
              <DollarIcon size="6" />
            </div>
            <input
              :value="payPalCredit.toFixed(2)"
              class="appearance-none block w-full bg-green-lightest text-grey-darkest border border-grey-lighter rounded py-4 pl-10 pr-6 leading-tight focus:outline-none focus:bg-white focus:border-grey"
              type="text"
              :disabled="true"
            />
          </div>
        </div>
        <!-- Nubi Fee -->
        <div class="mt-10">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          >Nubi Fee (10$ + 21% IVA)</label>
          <div class="flex relative">
            <div
              class="pointer-events-none absolute pin-y pin-l flex items-center px-3 text-grey-darker"
            >
              <DollarIcon size="6" />
            </div>
            <input
              :value="nubiFee.toFixed(2)"
              class="appearance-none block w-full bg-red-lightest text-grey-darkest border border-grey-lighter rounded py-4 pl-10 pr-6 leading-tight focus:outline-none focus:bg-white focus:border-grey"
              type="text"
              :disabled="true"
            />
          </div>
        </div>
        <!-- Bank Account -->
        <div class="mt-10">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          >Bank Account</label>
          <div class="flex relative">
            <div
              class="pointer-events-none absolute pin-y pin-l flex items-center px-3 text-grey-darker"
            >
              <DollarIcon size="6" />
            </div>
            <input
              :value="subtotal.toFixed(2)"
              class="appearance-none block w-full bg-green-lightest text-grey-darkest border border-grey-lighter rounded py-4 pl-10 pr-6 leading-tight focus:outline-none focus:bg-white focus:border-grey"
              type="text"
              :disabled="true"
            />
          </div>
        </div>
      </div>
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
      amount: null,
      payPal: {
        percentage: 5.4,
        fixed: 0.3
      },
      nubiTaxPercentage: 21
    };
  },
  computed: {
    ...mapState({
      exchange: state => state.exchange.value
    }),
    payPalFee() {
      return (this.amount * this.payPal.percentage) / 100 + this.payPal.fixed;
    },
    payPalCredit() {
      return this.amount - this.payPalFee;
    },
    nubiFee() {
      const fee =
        this.payPalCredit <= 2000 ? 10 : (this.payPalCredit * 0.5) / 100;

      return fee * (1 + this.nubiTaxPercentage / 100);
    },
    subtotal() {
      return (this.payPalCredit - this.nubiFee) * this.exchange;
    }
  }
};
</script>
