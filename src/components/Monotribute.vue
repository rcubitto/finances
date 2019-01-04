<template>
  <div class="flex">
    <div class="flex-1 mr-10">
      <div class="flex justify-between items-center">
        <p class="text-grey-dark uppercase text-xs font-bold flex items-center mb-3">
          <span class="mr-1">
            Choose a category
          </span>
          <ArrowDownIcon />
        </p>
        <button
          v-if="chosenCategory.label !== null"
          class="mb-1 focus:outline-none uppercase text-xs font-bold rounded border p-2 border-red text-red hover:border-transparent hover:bg-red hover:text-white"
          @click="chosenCategory = { label: null, income: null, total: null }"
        >
          Clear
        </button>
      </div>
      <div class="rounded overflow-hidden shadow">
        <table class="w-full">
          <thead>
            <tr class="bg-grey-lighter border-b-4 text-grey-darker uppercase tracking-wide text-xs font-bold">
              <th class="text-left p-4">
                Category
              </th>
              <th class="text-right p-4">
                Income AR$
              </th>
              <th class="text-right p-4">
                Tribute AR$
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(category, index) in categories"
              :key="index"
              class="text-grey-darkest cursor-pointer hover:bg-indigo-light hover:text-indigo-lightest"
              :class="{ 'bg-grey-lighter': index % 2 === 1, 'bg-indigo-dark': chosenCategory.label === category.label, 'text-indigo-lightest': chosenCategory.label === category.label }"
              @click="chosenCategory = category"
            >
              <td class="p-4">
                {{ category.label }}
              </td>
              <td class="text-right p-4">
                {{ format(category.income).get() }}
              </td>
              <td class="text-right p-4">
                {{ format(category.total).get() }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="flex-1">
      <p class="font-bold uppercase text-grey-darker text-right mb-5">
        Category {{ chosenCategory.label }}
      </p>
      <div class="flex">
        <div class="flex-1 bg-indigo-light p-4 rounded text-indigo-lightest mr-4">
          <span class="text-2xl">
            {{ format(chosenCategory.income).get() }}
          </span>
          <p class="text-indigo-lighter">
            Annual AR$
          </p>
        </div>
        <div class="flex-1 bg-indigo-light p-4 rounded text-indigo-lightest">
          <span class="text-2xl">
            {{ format(chosenCategory.income / 12).get() }}
          </span>
          <p class="text-indigo-lighter">
            Monthly AR$
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import format from "@/lib/Formatter";
import ArrowDownIcon from "@/components/shared/ArrowDownIcon";

export default {
  components: { ArrowDownIcon },
  data() {
    return {
      chosenCategory: { label: null, income: null, total: null },
      categories: [
        { label: "A", income: 138127.99, total: 1294.12 },
        { label: "B", income: 207191.98, total: 1447.06 },
        { label: "C", income: 276255.98, total: 1654.25 },
        { label: "D", income: 414383.98, total: 1950.73 },
        { label: "E", income: 552511.95, total: 2562.32 },
        { label: "F", income: 690639.95, total: 2649.34 },
        { label: "G", income: 828767.94, total: 3016.55 },
        { label: "H", income: 1151066.58, total: 5218.63 }
      ]
    };
  },
  computed: {
    ...mapState({
      exchange: state => state.exchange.value
    })
  },
  methods: {
    format
  }
};
</script>
