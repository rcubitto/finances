<template>
  <div :class="css">
    <table class="w-full">
      <thead>
        <tr
          :class="
            `bg-${color}-lightest border-b-4 border-${color}-lighter uppercase text-${color}-light tracking-wide text-xs font-bold`
          "
        >
          <th class="text-left p-4">Description → [{{ range }}]</th>
          <th class="text-right p-4">
            U$S
          </th>
          <th class="text-right p-4">
            AR$
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(entry, index) in entries"
          :key="index"
          class="text-grey-darkest"
          :class="{ 'bg-grey-lighter': index % 2 === 1 }"
        >
          <td class="p-4">
            {{ entry.detail }}
          </td>
          <td class="text-right p-4">
            {{ convert(entry.price, entry.currency).toUSD() }}
          </td>
          <td class="text-right p-4">
            {{ convert(entry.price, entry.currency).toARS() }}
          </td>
        </tr>
        <tr class="text-grey-darkest font-bold bg-grey-light">
          <td class="text-left p-4">
            Total
          </td>
          <td class="text-right p-4">
            {{ convert(entriesSum("USD")).get() }}
          </td>
          <td class="text-right p-4">
            {{ convert(entriesSum("ARS")).get() }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import convert from "@/lib/Converter";

export default {
  props: {
    entries: {
      type: Array,
      required: true
    },
    range: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: "red"
    },
    extraCss: {
      type: String,
      default: null
    }
  },
  computed: {
    css() {
      return `rounded overflow-hidden shadow ${this.extraCss || ""}`.trim();
    }
  },
  methods: {
    convert,
    entriesSum(currency) {
      return this.entries
        .map(entry =>
          convert(entry.price, entry.currency)
            .withoutFormat()
            .toCurrency(currency)
        )
        .reduce((carry, entry) => carry + entry, 0);
    }
  }
};
</script>
