<template>
  <div
    v-if="income && exchange && monthlyRateByCategory"
    class="border-grey-lighter border-t-2 border-dashed pt-6 mt-6"
  >
    <!-- Filters -->
    <div class="flex mb-6">
      <div class="flex items-center mr-6">
        <div class="bg-teal rounded-full w-10 h-5">
          <button
            class="bg-white focus:outline-none w-5 h-5 border rounded-full"
            style="transition: all 200ms"
            :style="viewType === 'table' ? 'transform: translateX(0%)' : 'transform: translateX(100%)'"
            @click="viewType = viewType === 'table' ? 'map' : 'table'"
          />
        </div>
        <span class="text-grey-dark uppercase font-bold text-xs mx-2">
          {{ viewType }}
        </span>
      </div>
      <div class="flex items-center mr-6">
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
    </div>
    <!-- Table -->
    <div
      v-if="viewType === 'table'"
      class="rounded overflow-hidden shadow"
    >
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
              {{ convert(payPalFee).toYear(!monthlyResults).get() }}
            </td>
            <td class="text-right p-4">
              {{ convert(payPalFee).toYear(!monthlyResults).toARS() }}
            </td>
          </tr>
          <tr class="text-grey-darkest border-b-4">
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
          <tr class="bg-grey-lighter  text-grey-darkest">
            <td class="p-4">
              Monotribute Limit [Bank Account]
            </td>
            <td class="text-right p-4">
              {{ convert(monthlyRateByCategory, "ARS").toYear(!monthlyResults).toUSD() }}
            </td>
            <td class="text-right p-4">
              {{ convert(monthlyRateByCategory, "ARS").toYear(!monthlyResults).toARS() }}
            </td>
          </tr>
          <tr class="text-grey-darkest">
            <td class="p-4">
              Nubi Fee
            </td>
            <td class="text-right p-4">
              {{ convert(nubiFee).toYear(!monthlyResults).get() }}
            </td>
            <td class="text-right p-4">
              {{ convert(nubiFee).toYear(!monthlyResults).toARS() }}
            </td>
          </tr>
          <tr class="bg-grey-lighter  text-grey-darkest">
            <td class="p-4">
              To Transfer
            </td>
            <td class="text-right p-4">
              {{ convert(convert(monthlyRateByCategory, "ARS").withoutFormat().toUSD() + nubiFee).toYear(!monthlyResults).get() }}
            </td>
            <td class="text-right p-4">
              {{ convert(convert(monthlyRateByCategory, "ARS").withoutFormat().toUSD() + nubiFee).toYear(!monthlyResults).toARS() }}
            </td>
          </tr>
          <tr class="bg-grey-light text-grey-darkest font-bold border-b-4">
            <td class="p-4">
              PayPal Remaining
            </td>
            <td class="text-right p-4">
              {{ convert(payPalNet - convert(monthlyRateByCategory, 'ARS').withoutFormat().toUSD() - nubiFee).toYear(!monthlyResults).toUSD() }}
            </td>
            <td class="text-right p-4">
              {{ convert(payPalNet - convert(monthlyRateByCategory, 'ARS').withoutFormat().toUSD() - nubiFee).toYear(!monthlyResults).toARS() }}
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
              Bank Account Remaining
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
    <!-- Diagram -->
    <div
      v-if="viewType === 'map'"
      class="flex mb-10"
    >
      <Pill
        color="indigo"
        :title="convert(gross).toYear(!monthlyResults).get()"
        subtitle="Gross Salary"
      />
      <DiscountStep
        :label="`–${convert(payPalFee).toYear(!monthlyResults).get()} Fee`"
      />
      <Pill
        color="blue"
        :title="convert(payPalNet).toYear(!monthlyResults).get()"
        subtitle="Paypal Account"
      />
      <DiscountStep label="After Transfer" />
      <Pill
        color="blue"
        :title="convert(payPalNet - convert(monthlyRateByCategory, 'ARS').withoutFormat().toUSD() - nubiFee).toYear(!monthlyResults).toUSD()"
        subtitle="PayPal Remaining"
      />
    </div>
    <div
      v-if="viewType === 'map'"
      class="flex"
    >
      <Pill
        color="teal"
        :title="convert(convert(monthlyRateByCategory, 'ARS').withoutFormat().toUSD() + nubiFee).toUSD()"
        subtitle="Transferable Amount"
      />
      <DiscountStep
        :label="`+${convert(nubiFee).toYear(!monthlyResults).get()} Nubi`"
      />
      <Pill
        color="blue"
        :title="convert(net).toYear(!monthlyResults).get()"
        subtitle="Bank Account"
      />
      <DiscountStep
        :label="`–${convert(entriesByRangeAndCurrencySum('outcome', 'monthly', 'USD')).toYear(!monthlyResults).get()} Expenses`"
      />
      <Pill
        color="green"
        :title="convert(net - entriesByRangeAndCurrencySum('outcome', 'monthly', 'USD')).toYear(!monthlyResults).get()"
        subtitle="Balance"
      />
    </div>
  </div>
  <p
    v-else
    class="text-grey-dark mt-6"
  >
    Add an <span class="text-grey-darker font-bold">
      income
    </span> and select a <span class="text-grey-darker font-bold">category</span> to see results...
  </p>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import convert from "@/lib/Converter";
import Pill from "@/components/Pill";
import DiscountStep from "@/components/DiscountStep";

export default {
  components: { Pill, DiscountStep },
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
      },
      viewType: "table"
    };
  },
  computed: {
    ...mapState({
      exchange: state => state.exchange.value,
      income: state => state.income.value,
      margin: state => state.income.margin,
      range: state => state.income.range,
      monthlyRateByCategory: state => state.category.income / 12
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
    payPalFee() {
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
        return this.gross - this.payPalFee;
      }
    },
    nubiFee() {
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
      return convert(this.monthlyRateByCategory, "ARS")
        .withoutFormat()
        .toUSD();
    }
  },
  methods: { convert }
};
</script>
