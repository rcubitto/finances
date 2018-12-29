<template>
  <div class="container mx-auto pt-6">
    <div class="mb-6 flex">
      <div class="flex-1 mr-6">
        <label
          class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          for="dollar"
        >
          ARS/USD
        </label>
        <div class="flex relative">
          <DollarIcon />
          <input
            id="dollar"
            v-model.number="dollar"
            class="appearance-none block w-full bg-grey-lighter text-grey-darkest border border-grey-lighter rounded py-3 pl-8 pr-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
            type="number"
          >
        </div>
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
      <div class="flex flex-col justify-end pb-1 mr-6">
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
      <div class="flex flex-col justify-end pb-1">
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
    <div
      v-if="income && dollar"
      class="flex border-grey-lighter border-t-2 pt-6"
    >
      <div class="flex-1 mr-16 rounded overflow-hidden shadow">
        <table class="w-full">
          <thead>
            <tr class="bg-grey-lighter border-b-4 text-grey-darker uppercase tracking-wide text-xs font-bold">
              <th class="text-left p-4">
                Monthly
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
                Gross
              </td>
              <td class="text-right p-4">
                {{ formatter.format(gross) }}
              </td>
              <td class="text-right p-4">
                {{ formatter.format(toArs(gross)) }}
              </td>
            </tr>
            <tr class="bg-grey-lighter text-grey-darkest">
              <td class="p-4">
                PayPal Fee
              </td>
              <td class="text-right p-4">
                {{ formatter.format(payPalDiscount) }}
              </td>
              <td class="text-right p-4">
                {{ formatter.format(toArs(payPalDiscount)) }}
              </td>
            </tr>
            <tr class="text-grey-darkest">
              <td class="p-4">
                PayPal
              </td>
              <td class="text-right p-4">
                {{ formatter.format(payPalNet) }}
              </td>
              <td class="text-right p-4">
                {{ formatter.format(toArs(payPalNet)) }}
              </td>
            </tr>
            <tr class="bg-grey-lighter text-grey-darkest">
              <td class="p-4">
                Nubi Fee
              </td>
              <td class="text-right p-4">
                {{ formatter.format(nubiDiscount) }}
              </td>
              <td class="text-right p-4">
                {{ formatter.format(toArs(nubiDiscount)) }}
              </td>
            </tr>
            <tr class="text-grey-darkest font-bold">
              <td class="p-4">
                Net
              </td>
              <td class="text-right p-4">
                {{ formatter.format(net) }}
              </td>
              <td class="text-right p-4">
                {{ formatter.format(toArs(net)) }}
              </td>
            </tr>
            <tr class="bg-grey-lighter text-grey-darkest">
              <td class="p-4">
                Difference
              </td>
              <td class="text-right p-4">
                {{ formatter.format((gross - net)) }}
              </td>
              <td class="text-right p-4">
                {{ formatter.format(toArs(gross - net)) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex-1 rounded overflow-hidden shadow">
        <table class="w-full">
          <thead>
            <tr class="bg-grey-lighter border-b-4 text-grey-darker uppercase tracking-wide text-xs font-bold">
              <th class="text-left p-4">
                Yearly
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
                Gross
              </td>
              <td class="text-right p-4">
                {{ formatter.format(yearly(gross)) }}
              </td>
              <td class="text-right p-4">
                {{ formatter.format(toArs(yearly(gross))) }}
              </td>
            </tr>
            <tr class="bg-grey-lighter text-grey-darkest">
              <td class="p-4">
                PayPal Fee
              </td>
              <td class="text-right p-4">
                {{ formatter.format(yearly(payPalDiscount)) }}
              </td>
              <td class="text-right p-4">
                {{ formatter.format(toArs(yearly(payPalDiscount))) }}
              </td>
            </tr>
            <tr class="text-grey-darkest">
              <td class="p-4">
                PayPal
              </td>
              <td class="text-right p-4">
                {{ formatter.format(yearly(payPalNet)) }}
              </td>
              <td class="text-right p-4">
                {{ formatter.format(toArs(yearly(payPalNet))) }}
              </td>
            </tr>
            <tr class="bg-grey-lighter text-grey-darkest">
              <td class="p-4">
                Nubi Fee
              </td>
              <td class="text-right p-4">
                {{ formatter.format(yearly(nubiDiscount)) }}
              </td>
              <td class="text-right p-4">
                {{ formatter.format(toArs(yearly(nubiDiscount))) }}
              </td>
            </tr>
            <tr class="text-grey-darkest">
              <td class="p-4">
                Net
              </td>
              <td class="text-right p-4">
                {{ formatter.format(yearly(net)) }}
              </td>
              <td class="text-right p-4">
                {{ formatter.format(toArs(yearly(net))) }}
              </td>
            </tr>
            <tr class="bg-grey-lighter text-grey-darkest">
              <td class="p-4">
                Difference
              </td>
              <td class="text-right p-4">
                {{ formatter.format(yearly(gross - net)) }}
              </td>
              <td class="text-right p-4">
                {{ formatter.format(toArs(yearly(gross - net))) }}
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
  </div>
</template>

<script>
import axios from "axios";
import DollarIcon from "./shared/DollarIcon";

export default {
  components: { DollarIcon },
  data() {
    return {
      dollar: null,
      income: null,
      range: "monthly",
      margin: "gross",

      paypal: {
        percentage: 0.054,
        fixed: 0.3
      },
      nubi: {
        percentage: 0.029,
        tax: 0.21
      },

      formatter: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
      })
    };
  },
  computed: {
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
    }
  },
  created() {
    axios
      .get("http://ws.geeklab.com.ar/dolar/get-dolar-json.php")
      .then(({ data: { libre } }) => (this.dollar = libre))
      .catch(err => console.error(err)); // TODO: show input error

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
    yearly(amount) {
      return amount * 12;
    },
    toArs(amount) {
      return amount * this.dollar;
    }
  }
};
</script>
