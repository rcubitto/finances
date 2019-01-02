<template>
  <div class="container mx-auto mt-6 flex">
    <div class="flex-1 mr-10">
      <div class="rounded overflow-hidden shadow">
        <table class="w-full">
          <thead>
            <tr class="bg-red-lightest border-b-4 border-red-lighter uppercase text-red-light tracking-wide text-xs font-bold">
              <th class="text-left p-4">
                Description → [Monthly]
              </th>
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
              v-for="(entry, index) in monthlyOutcomeEntries"
              :key="index"
              class="text-grey-darkest"
              :class="{ 'bg-grey-lighter': index % 2 === 1 }"
            >
              <td class="p-4">
                {{ entry.detail }}
              </td>
              <td class="text-right p-4">
                {{ entry.currency === "USD" ? format(entry.price).get() : format(entry.price).toUSD(exchange) }}
              </td>
              <td class="text-right p-4">
                {{ entry.currency === "ARS" ? format(entry.price).get() : format(entry.price).toARS(exchange) }}
              </td>
            </tr>
            <tr class="text-grey-darkest font-bold">
              <td class="text-left p-4">
                Total
              </td>
              <td class="text-right p-4">{{ format(monthlyOutcomeEntries.reduce((carry, entry) => {
                  return carry + (entry.currency === "USD" ? entry.price : entry.price / exchange);
                }, 0)).get() }}</td>
              <td class="text-right p-4">{{ format(monthlyOutcomeEntries.reduce((carry, entry) => {
                return carry + (entry.currency === "ARS" ? entry.price : entry.price * exchange);
                }, 0)).get() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="flex-1 flex flex-col justify-between">
      <div class="rounded overflow-hidden shadow">
        <table class="w-full">
          <thead>
            <tr class="bg-red-lightest border-b-4 border-red-lighter uppercase text-red-light tracking-wide text-xs font-bold">
              <th class="text-left p-4">
                Description → [Yearly]
              </th>
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
              v-for="(entry, index) in yearlyOutcomeEntries"
              :key="index"
              class="text-grey-darkest"
              :class="{ 'bg-grey-lighter': index % 2 === 1 }"
            >
              <td class="p-4">
                {{ entry.detail }}
              </td>
              <td
                class="text-right p-4"
                :class="{ 'font-bold': entry.currency === 'USD' }"
              >
                {{ entry.currency === "USD" ? format(entry.price).get() : format(entry.price).toUSD(exchange) }}
              </td>
              <td
                class="text-right p-4"
                :class="{ 'font-bold': entry.currency === 'ARS' }"
              >
                {{ entry.currency === "ARS" ? format(entry.price).get() : format(entry.price).toARS(exchange) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="rounded overflow-hidden shadow">
        <table class="w-full">
          <thead>
            <tr class="bg-green-lightest border-b-4 border-green-light uppercase text-green-dark tracking-wide text-xs font-bold">
              <th class="text-left p-4">
                Description → [Yearly]
              </th>
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
              v-for="(entry, index) in yearlyIncomeEntries"
              :key="index"
              class="text-grey-darkest"
              :class="{ 'bg-grey-lighter': index % 2 === 1 }"
            >
              <td class="p-4">
                {{ entry.detail }}
              </td>
              <td
                class="text-right p-4"
                :class="{ 'font-bold': entry.currency === 'USD' }"
              >
                {{ entry.currency === "USD" ? format(entry.price).get() : format(entry.price).toUSD(exchange) }}
              </td>
              <td
                class="text-right p-4"
                :class="{ 'font-bold': entry.currency === 'ARS' }"
              >
                {{ entry.currency === "ARS" ? format(entry.price).get() : format(entry.price).toARS(exchange) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import format from "../lib/Formatter";

export default {
  computed: {
    ...mapState({
      entries: state => state.entries,
      exchange: state => state.exchange.value
    }),
    ...mapGetters([
      "monthlyOutcomeEntries",
      "yearlyOutcomeEntries",
      "yearlyIncomeEntries"
    ])
  },
  methods: {
    format
  }
};
</script>
