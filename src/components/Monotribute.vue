<template>
  <div class="flex">
    <div class="flex-1 mr-10">
      <p class="text-grey-dark uppercase text-xs font-bold flex items-center mb-2">
        <span class="mr-1">
          Choose a category
        </span>
        <ArrowDownIcon />
      </p>
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
              v-for="(_category, index) in categories"
              :key="index"
              class="text-grey-darkest cursor-pointer hover:bg-indigo-light hover:text-indigo-lightest"
              :class="{ 'bg-grey-lighter': index % 2 === 1, 'bg-indigo-dark text-indigo-lightest': matchesChosenCategory(_category) }"
              @click="toggleCategory(_category)"
            >
              <td class="p-4">
                {{ _category.label }}
              </td>
              <td class="text-right p-4">
                {{ format(_category.income).get() }}
              </td>
              <td class="text-right p-4">
                {{ format(_category.total).get() }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="flex-1">
      <template v-if="hasChosenCategory()">
        <p class="font-bold uppercase text-xl text-grey-darker mb-5">
          Category {{ category.label }}
        </p>
        <div class="flex mb-4">
          <div class="flex-1 bg-indigo-light px-6 py-6 rounded text-indigo-lightest mr-4 overflow-hidden shadow-md">
            <span class="text-2xl">
              {{ format(category.income).get() }}
            </span>
            <p class="text-indigo-lighter">
              Annual Gross Income AR$
            </p>
          </div>
          <div class="flex-1 bg-indigo-light px-6 py-6 rounded text-indigo-lightest overflow-hidden shadow-md">
            <span class="text-2xl mb-4">
              {{ format(category.income / 12).get() }}
            </span>
            <p class="text-indigo-lighter">
              Monthly Gross Income AR$
            </p>
          </div>
        </div>
        <div class="flex">
          <div class="flex-1 bg-teal-light px-6 py-6 rounded text-teal-lightest mr-4 overflow-hidden shadow-md">
            <span class="text-2xl">
              {{ format(category.income / exchange).get() }}
            </span>
            <p class="text-teal-lighter">
              Annual Gross Income U$S
            </p>
          </div>
          <div class="flex-1 bg-teal-light px-6 py-6 rounded text-teal-lightest overflow-hidden shadow-md">
            <span class="text-2xl">
              {{ format(category.income / 12 / exchange).get() }}
            </span>
            <p class="text-teal-lighter">
              Monthly Gross Income U$S
            </p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import format from "@/lib/Formatter";
import ArrowDownIcon from "@/components/ArrowDownIcon";

export default {
  components: { ArrowDownIcon },
  data() {
    return {
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
      exchange: state => state.exchange.value,
      category: "category"
    })
  },
  methods: {
    ...mapActions(["syncCategory"]),
    format,
    hasChosenCategory() {
      return this.category.label !== null;
    },
    matchesChosenCategory(category) {
      return this.category.label === category.label;
    },
    toggleCategory(category) {
      this.syncCategory(
        this.matchesChosenCategory(category)
          ? { label: null, income: null, total: null }
          : category
      );
    }
  }
};
</script>
