<template>
  <div class="flex">
    <div class="flex-1 mr-10">
      <p class="text-grey-dark uppercase text-xs font-bold flex items-center mb-2">
        <span class="mr-1">Choose a category</span>
        <ArrowDownIcon />
      </p>
      <div class="rounded overflow-hidden shadow">
        <table class="w-full">
          <thead>
            <tr
              class="bg-grey-lighter border-b-4 text-grey-darker uppercase tracking-wide text-xs font-bold"
            >
              <th class="text-left p-4">Category</th>
              <th class="text-right p-4">Income AR$</th>
              <th class="text-right p-4">Monthly Tribute AR$</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(_category, index) in categories"
              :key="index"
              class="text-grey-darkest cursor-pointer hover:bg-indigo-light hover:text-indigo-lightest"
              :class="{
                'bg-grey-lighter': index % 2 === 1,
                'bg-indigo-dark text-indigo-lightest': matchesChosenCategory(
                  _category
                )
              }"
              @click="toggleCategory(_category)"
            >
              <td class="p-4">{{ _category.label }}</td>
              <td class="text-right p-4">
                {{
                money({ amount: _category.income, currency: "ARS" }).format()
                }}
              </td>
              <td class="text-right p-4">
                {{
                money({ amount: _category.total, currency: "ARS" }).format()
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="flex-1">
      <template v-if="hasChosenCategory">
        <p class="font-bold uppercase text-xl text-grey-darker mb-5">Category {{ category.label }}</p>

        <div class="rounded overflow-hidden shadow">
          <table class="w-full">
            <thead>
              <tr class="border-b-4 text-grey-darker uppercase tracking-wide text-xs font-bold">
                <th class="text-left p-4 bg-grey-lighter border-r-4">Gross Income</th>
                <th class="text-right p-4 bg-teal-light text-white">ARS</th>
                <th class="text-right p-4 bg-teal-light text-white">USD</th>
              </tr>
            </thead>
            <tbody>
              <tr class>
                <td
                  class="bg-indigo-light text-white border-r-4 p-4 text-grey-darker uppercase tracking-wide text-xs font-bold"
                >Annual</td>
                <td class="text-right p-4">
                  {{
                  money({ amount: category.income, currency: "ARS" }).format()
                  }}
                </td>
                <td class="text-right p-4">
                  {{
                  money({ amount: category.income, currency: "ARS" })
                  .exchangeToDollars()
                  .format()
                  }}
                </td>
              </tr>
              <tr class>
                <td
                  class="bg-indigo-light text-white border-r-4 p-4 text-grey-darker uppercase tracking-wide text-xs font-bold"
                >Monthly</td>
                <td class="text-right p-4 bg-grey-lighter">
                  {{
                  money({
                  amount: category.income / 12,
                  currency: "ARS"
                  }).format()
                  }}
                </td>
                <td class="text-right p-4 bg-grey-lighter">
                  {{
                  money({ amount: category.income / 12, currency: "ARS" })
                  .exchangeToDollars()
                  .format()
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import money from "@/lib/Money";
import ArrowDownIcon from "@/components/ArrowDownIcon";

export default {
  components: { ArrowDownIcon },
  data() {
    return {
      categories: [
        { label: "A", income: 13812799, total: 129412 },
        { label: "B", income: 20719198, total: 144706 },
        { label: "C", income: 27625598, total: 165425 },
        { label: "D", income: 41438398, total: 195073 },
        { label: "E", income: 55251195, total: 256232 },
        { label: "F", income: 69063995, total: 264934 },
        { label: "G", income: 82876794, total: 301655 },
        { label: "H", income: 115106658, total: 521863 }
      ],
      category: {}
    };
  },
  mounted() {
    this.category = this.skeletonCategory;
  },
  computed: {
    ...mapState({
      exchange: state => state.exchange.value
    }),
    hasChosenCategory() {
      return this.category.label !== null;
    },
    skeletonCategory() {
      return { label: null, income: null, total: null };
    }
  },
  methods: {
    money,
    matchesChosenCategory(category) {
      return this.hasChosenCategory && this.category.label === category.label;
    },
    toggleCategory(category) {
      this.category = this.matchesChosenCategory(category)
        ? this.skeletonCategory
        : category;
    }
  }
};
</script>
