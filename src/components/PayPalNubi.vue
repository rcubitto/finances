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
        <div class="flex items-center">
          <span class="-mr-5 z-10 text-grey-dark">
            $
          </span>
          <input
            id="dollar"
            v-model="dollar"
            class="appearance-none block w-full bg-grey-lighter text-grey-darkest border border-grey-lighter rounded py-3 pl-6 pr-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
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
        <div class="flex items-center">
          <span class="-mr-5 z-10 text-grey-dark">
            $
          </span>
          <input
            id="income"
            v-model="income"
            class="appearance-none block w-full bg-grey-lighter text-grey-darkest border border-grey-lighter rounded py-3 pl-6 pr-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
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
              <th class="p-4">Monthly</th>
              <th class="p-4">U$D</th>
              <th class="p-4">AR$</th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-grey-darkest">
              <td class="p-4">Gross</td>
              <td class="text-right p-4">
                {{ gross }}
              </td>
              <td class="text-right p-4">
                {{ toArs(gross) }}
              </td>
            </tr>
            <tr class="bg-grey-lighter text-grey-darkest">
              <td class="p-4">PayPal Fee</td>
              <td class="text-right p-4">
                {{ payPalDiscount }}
              </td>
              <td class="text-right p-4">
                {{ toArs(payPalDiscount) }}
              </td>
            </tr>
            <tr class="text-grey-darkest">
              <td class="p-4">PayPal</td>
              <td class="text-right p-4">
                {{ payPalNet }}
              </td>
              <td class="text-right p-4">
                {{ toArs(payPalNet) }}
              </td>
            </tr>
            <tr class="bg-grey-lighter text-grey-darkest">
              <td class="p-4">Nubi Fee</td>
              <td class="text-right p-4">
                {{ nubiDiscount }}
              </td>
              <td class="text-right p-4">
                {{ toArs(nubiDiscount) }}
              </td>
            </tr>
            <tr class="text-grey-darkest">
              <td class="p-4">Net</td>
              <td class="text-right p-4">
                {{ net }}
              </td>
              <td class="text-right p-4">
                {{ toArs(net) }}
              </td>
            </tr>
            <tr class="bg-grey-lighter text-grey-darkest">
              <td class="p-4">Difference</td>
              <td class="text-right p-4">
                {{ gross - net }}
              </td>
              <td class="text-right p-4">
                {{ toArs(gross - net) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex-1 rounded overflow-hidden shadow">
        <table class="w-full">
          <thead>
            <tr class="bg-grey-lighter border-b-4 text-grey-darker uppercase tracking-wide text-xs font-bold">
              <th class="p-4">Yearly</th>
              <th class="p-4">U$D</th>
              <th class="p-4">AR$</th>
            </tr>
          </thead>
          <tbody>
          <tr class="text-grey-darkest">
              <td class="p-4">Gross</td>
              <td class="text-right p-4">{{ yearly(gross) }}</td>
              <td class="text-right p-4">{{ toArs(yearly(gross)) }}</td>
            </tr>
          <tr class="bg-grey-lighter text-grey-darkest">
              <td class="p-4">PayPal Fee</td>
              <td class="p-4">{{ yearly(payPalDiscount) }}</td>
              <td class="p-4">{{ toArs(yearly(payPalDiscount)) }}</td>
            </tr>
          <tr class="text-grey-darkest">
              <td class="p-4">PayPal</td>
              <td class="p-4">{{ yearly(payPalNet) }}</td>
              <td class="p-4">{{ toArs(yearly(payPalNet)) }}</td>
            </tr>
          <tr class="bg-grey-lighter text-grey-darkest">
              <td class="p-4">Nubi Fee</td>
              <td class="p-4">{{ yearly(nubiDiscount) }}</td>
              <td class="p-4">{{ toArs(yearly(nubiDiscount)) }}</td>
            </tr>
          <tr class="text-grey-darkest">
              <td class="p-4">Net</td>
              <td class="p-4">{{ yearly(net) }}</td>
              <td class="p-4">{{ toArs(yearly(net)) }}</td>
            </tr>
          <tr class="bg-grey-lighter text-grey-darkest">
              <td class="p-4">Difference</td>
              <td class="p-4">{{ yearly(gross - net) }}</td>
              <td class="p-4">{{ toArs(yearly(gross - net)) }}</td>
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

export default {
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
      }
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
