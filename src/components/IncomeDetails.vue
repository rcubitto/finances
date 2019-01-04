<template>
  <div
    v-if="income && exchange"
    class="border-grey-lighter border-t-2 pt-6"
  >
    <div class="flex items-center mb-6">
      <div class="bg-indigo rounded-full w-10 h-5">
        <button
          class="bg-white focus:outline-none w-5 h-5 border rounded-full"
          style="transition: all 200ms"
          :style="monthlyResults ? 'transform: translateX(0%)' : 'transform: translateX(100%)'"
          @click="monthlyResults = ! monthlyResults"
        />
      </div>
      <span class="text-grey-dark uppercase font-bold text-xs mx-2">
        {{ monthlyResults ? 'Per Month' : 'Per Year' }}
      </span>
    </div>
    <div class="rounded overflow-hidden shadow">
      <table class="w-full">
        <thead>
          <tr class="bg-grey-lighter border-b-4 text-grey-darker uppercase tracking-wide text-xs font-bold">
            <th class="text-left p-4">
              Description
            </th>
            <th class="text-right p-4">
              U$D
            </th>
            <th class="text-right p-4">
              AR$
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-grey-darkest">
            <td class="p-4">
              Gross Salary
            </td>
            <td class="text-right p-4">
              {{ convert(gross).toYear(!monthlyResults).get() }}
            </td>
            <td class="text-right p-4">
              {{ convert(gross).toYear(!monthlyResults).toARS() }}
            </td>
          </tr>
          <tr class="bg-grey-lighter text-grey-darkest">
            <td class="p-4">
              PayPal Fee
            </td>
            <td class="text-right p-4">
              {{ convert(payPalDiscount).toYear(!monthlyResults).get() }}
            </td>
            <td class="text-right p-4">
              {{ convert(payPalDiscount).toYear(!monthlyResults).toARS() }}
            </td>
          </tr>
          <tr class="text-grey-darkest">
            <td class="p-4">
              PayPal Account
            </td>
            <td class="text-right p-4">
              {{ convert(payPalNet).toYear(!monthlyResults).get() }}
            </td>
            <td class="text-right p-4">
              {{ convert(payPalNet).toYear(!monthlyResults).toARS() }}
            </td>
          </tr>
          <tr class="bg-grey-lighter text-grey-darkest">
            <td class="p-4">
              Nubi Fee
            </td>
            <td class="text-right p-4">
              {{ convert(nubiDiscount).toYear(!monthlyResults).get() }}
            </td>
            <td class="text-right p-4">
              {{ convert(nubiDiscount).toYear(!monthlyResults).toARS() }}
            </td>
          </tr>
          <tr class="text-grey-darkest">
            <td class="p-4">
              Subtotal Fees
            </td>
            <td class="text-right p-4">
              {{ convert(gross - net).toYear(!monthlyResults).get() }}
            </td>
            <td class="text-right p-4">
              {{ convert(gross - net).toYear(!monthlyResults).toARS() }}
            </td>
          </tr>
          <tr class="bg-grey-lighter text-grey-darkest">
            <td class="p-4">
              Net Salary
            </td>
            <td class="text-right p-4">
              {{ convert(net).toYear(!monthlyResults).get() }}
            </td>
            <td class="text-right p-4">
              {{ convert(net).toYear(!monthlyResults).toARS() }}
            </td>
          </tr>
          
          <tr class="text-grey-darkest">
            <td class="p-4">
              Monthly Expense
            </td>
            <td class="text-right p-4">
              {{ convert(entriesByRangeAndCurrencySum("outcome", "monthly", "USD")).toYear(!monthlyResults).get() }}
            </td>
            <td class="text-right p-4">
              {{ convert(entriesByRangeAndCurrencySum("outcome", "monthly", "ARS")).toYear(!monthlyResults).get() }}
            </td>
          </tr>
          <tr class="bg-grey-light text-grey-darkest font-bold">
            <td class="p-4">
              Balance
            </td>
            <td class="text-right p-4">
              {{ convert(net - entriesByRangeAndCurrencySum("outcome", "monthly", "USD")).toYear(!monthlyResults).get() }}
            </td>
            <td class="text-right p-4">
              {{ convert((net * exchange) - entriesByRangeAndCurrencySum("outcome", "monthly", "ARS")).toYear(!monthlyResults).get() }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <p
    v-else
    class="text-grey-dark mt-6"
  >
    Add an income to see results...
  </p>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import convert from "@/lib/Converter";

export default {
  data() {
    return {
      monthlyResults: true,
      paypal: {
        percentage: 0.054,
        fixed: 0.3
      },
      nubi: {
        percentage: 0.029,
        tax: 0.21
      }
    };
  },
  computed: {
    ...mapState({
      exchange: state => state.exchange.value,
      income: state => state.income.value,
      margin: state => state.income.margin,
      range: state => state.income.range
    }),
    ...mapGetters(["entriesByRangeAndCurrencySum"]),
    gross() {
      if (this.margin === "net") {
        return (
          (this.payPalNet + this.paypal.fixed) / (1 - this.paypal.percentage)
        );
      } else {
        return this.range === "yearly" ? this.income / 12 : this.income;
      }
    },
    payPalDiscount() {
      if (this.margin === "net") {
        return this.gross * this.paypal.percentage - this.paypal.fixed;
      } else {
        return this.gross * this.paypal.percentage + this.paypal.fixed;
      }
    },
    payPalNet() {
      if (this.margin === "net") {
        return (
          this.net /
          (1 - this.nubi.percentage - this.nubi.percentage * this.nubi.tax)
        );
      } else {
        return this.gross - this.payPalDiscount;
      }
    },
    nubiDiscount() {
      if (this.margin === "net") {
        return this.payPalNet - this.net;
      } else {
        return (
          this.payPalNet * this.nubi.percentage +
          this.payPalNet * this.nubi.percentage * this.nubi.tax
        );
      }
    },
    net() {
      if (this.margin === "net") {
        return this.range === "yearly" ? this.income / 12 : this.income;
      } else {
        return this.payPalNet - this.nubiDiscount;
      }
    },
    total() {
      return 10;
    }
  },
  methods: { convert }
};
</script>
