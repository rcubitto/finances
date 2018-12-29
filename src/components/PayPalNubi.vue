<template>
  <div>
    <div>
      <label
        class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
        for="dollar"
      >
        ARS/USD
      </label>
      <input
        id="dollar"
        v-model="dollar"
        class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
        type="text"
      >
    </div>
    <div class="flex">
      <div class="flex-1">
        <label
          class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          for="income"
        >
          Salary
        </label>
        <input
          id="income"
          v-model="income"
          class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
          type="text"
        >
      </div>
      <div class="flex-1">
        <input
          v-model="range"
          type="radio"
          value="monthly"
        >Monthly
        <input
          v-model="range"
          type="radio"
          value="yearly"
        >Yearly
      </div>
      <div class="flex-1">
        <input
          v-model="margin"
          type="radio"
          value="gross"
        >Gross
        <input
          v-model="margin"
          type="radio"
          value="net"
        >Net
      </div>
    </div>
    <div
      v-if="income && dollar"
      class="flex"
    >
      <div class="flex-1">
        <table>
          <thead>
            <tr>
              <th>Monthly</th>
              <th>USD</th>
              <th>ARS ~ ${{ dollar }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Gross</td>
              <td>{{ gross }}</td>
              <td>{{ toArs(gross) }}</td>
            </tr>
            <tr>
              <td>PayPal Fee</td>
              <td>{{ payPalDiscount }}</td>
              <td>{{ toArs(payPalDiscount) }}</td>
            </tr>
            <tr>
              <td>PayPal</td>
              <td>{{ payPalNet }}</td>
              <td>{{ toArs(payPalNet) }}</td>
            </tr>
            <tr>
              <td>Nubi Fee</td>
              <td>{{ nubiDiscount }}</td>
              <td>{{ toArs(nubiDiscount) }}</td>
            </tr>
            <tr>
              <td>Net</td>
              <td>{{ net }}</td>
              <td>{{ toArs(net) }}</td>
            </tr>
            <tr>
              <td>Difference</td>
              <td>{{ gross - net }}</td>
              <td>{{ toArs(gross - net) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex-1">
        <table>
          <thead>
            <tr>
              <th>Yearly</th>
              <th>USD</th>
              <th>ARS ~ ${{ dollar }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Gross</td>
              <td>{{ yearly(gross) }}</td>
              <td>{{ toArs(yearly(gross)) }}</td>
            </tr>
            <tr>
              <td>PayPal Fee</td>
              <td>{{ yearly(payPalDiscount) }}</td>
              <td>{{ toArs(yearly(payPalDiscount)) }}</td>
            </tr>
            <tr>
              <td>PayPal</td>
              <td>{{ yearly(payPalNet) }}</td>
              <td>{{ toArs(yearly(payPalNet)) }}</td>
            </tr>
            <tr>
              <td>Nubi Fee</td>
              <td>{{ yearly(nubiDiscount) }}</td>
              <td>{{ toArs(yearly(nubiDiscount)) }}</td>
            </tr>
            <tr>
              <td>Net</td>
              <td>{{ yearly(net) }}</td>
              <td>{{ toArs(yearly(net)) }}</td>
            </tr>
            <tr>
              <td>Difference</td>
              <td>{{ yearly(gross - net) }}</td>
              <td>{{ toArs(yearly(gross - net)) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dollar: null,
      income: null,
      range: "monthly",
      margin: "gross"
    };
  },
  computed: {
    gross() {
      if (this.margin === "net") {
        return (this.payPalNet + 0.3) / (1 - 0.054);
      } else {
        return this.range === "yearly" ? this.income / 12 : this.income;
      }
    },
    payPalDiscount() {
      if (this.margin === "net") {
        return this.gross * 0.054 - 0.3;
      } else {
        return this.gross * 0.054 + 0.3;
      }
    },
    payPalNet() {
      if (this.margin === "net") {
        return this.net / (1 - 0.029 - 0.029 * 0.21);
      } else {
        return this.gross - this.payPalDiscount;
      }
    },
    nubiDiscount() {
      if (this.margin === "net") {
        return this.payPalNet - this.net;
      } else {
        return this.payPalNet * 0.029 + this.payPalNet * 0.029 * 0.21;
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
