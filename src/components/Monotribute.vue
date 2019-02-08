<template>
  <div class="flex">
    <div class="flex-1 mr-10">
      <p
        class="text-grey-dark uppercase text-xs font-bold flex items-center mb-2"
      >
        <span class="mr-1">
          Choose a category
        </span>
        <ArrowDownIcon />
      </p>
      <div class="rounded overflow-hidden shadow">
        <table class="w-full">
          <thead>
            <tr
              class="bg-grey-lighter border-b-4 text-grey-darker uppercase tracking-wide text-xs font-bold"
            >
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
              :class="{
                'bg-grey-lighter': index % 2 === 1,
                'bg-indigo-dark text-indigo-lightest': matchesChosenCategory(
                  _category
                )
              }"
              @click="toggleCategory(_category)"
            >
              <td class="p-4">
                {{ _category.label }}
              </td>
              <td class="text-right p-4">
                {{ convert(_category.income, "ARS").get() }}
              </td>
              <td class="text-right p-4">
                {{ convert(_category.total, "ARS").get() }}
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
          <Pill
            color="indigo"
            :title="convert(category.income, 'ARS').get()"
            subtitle="Annual Gross Income AR$"
            extra-css="flex-1 mr-4"
          />
          <Pill
            color="indigo"
            :title="convert(category.income / 12, 'ARS').get()"
            subtitle="Monthly Gross Income AR$"
            extra-css="flex-1"
          />
        </div>
        <div class="flex">
          <Pill
            color="teal"
            :title="convert(category.income / exchange).get()"
            subtitle="Annual Gross Income U$S"
            extra-css="flex-1 mr-4"
          />
          <Pill
            color="teal"
            :title="convert(category.income / 12 / exchange).get()"
            subtitle="Monthly Gross Income U$S"
            extra-css="flex-1"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import convert from "@/lib/Converter";
import ArrowDownIcon from "@/components/ArrowDownIcon";
import Pill from "@/components/Pill";

export default {
  components: { ArrowDownIcon, Pill },
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
    convert,
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
