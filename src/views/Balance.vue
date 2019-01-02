<template>
  <div class="container mx-auto mt-6">
    <div class="rounded overflow-hidden shadow">
      <table class="w-full">
        <thead>
          <tr class="bg-grey-lighter border-b-4 text-grey-darker uppercase tracking-wide text-xs font-bold">
            <th
              v-for="(header, index) in headers"
              :key="index"
              class="text-left p-4"
              :class="{ 'text-right': header.representsMoney }"
            >
              {{ header.label }}
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
              {{ entry.type }}
            </td>
            <td class="p-4">
              {{ entry.range }}
            </td>
            <td class="p-4">
              {{ entry.detail }}
            </td>
            <td class="text-right p-4">
              {{ entry.currency === "ARS" ? format(entry.price).toARS(exchange) : format(entry.price).get() }}
            </td>
            <td class="text-right p-4">
              {{ entry.currency === "USD" ? format(entry.price).get() : format(entry.price).toARS(exchange) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import format from "../lib/Formatter";

export default {
  data() {
    return {
      headers: [
        { label: "Type", representsMoney: false },
        { label: "Range", representsMoney: false },
        { label: "Detail", representsMoney: false },
        { label: "AR$", representsMoney: true },
        { label: "U$S", representsMoney: true }
      ]
    };
  },
  computed: {
    ...mapState({
      entries: state => state.entries,
      exchange: state => state.exchange.value
    })
  },
  methods: {
    format
  }
};
</script>
