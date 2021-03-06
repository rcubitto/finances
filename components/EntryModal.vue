<template>
  <div
    v-if="show"
    class="fixed z-50 inset-0 w-full h-full bg-whitesmoke overflow-auto flex items-center justify-center"
  >
    <div class="bg-white rounded p-8 w-1/2">
      <h3 class="text-gray-700 font-normal border-gray-300 border-b mb-5 pb-5">
        {{ this.mode === "create" ? "New" : "Edit " }} Entry
      </h3>
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        for="plan"
      >
        Plan
      </label>
      <div class="relative">
        <select
          class="block appearance-none w-full bg-gray-300 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray"
          id="plan"
          v-model="model.plan"
        >
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
        <div
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
        >
          <CarretDown />
        </div>
      </div>
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-8"
        for="description"
      >
        Description
      </label>
      <input
        id="description"
        class="appearance-none block w-full bg-gray-300 text-gray-900 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray"
        type="text"
        v-model="model.description"
      />
      <div class="flex">
        <div class="flex-1 mr-4">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-8"
            for="amount"
          >
            Amount (in cents)
          </label>
          <input
            id="amount"
            class="appearance-none block w-full bg-gray-300 text-gray-900 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray"
            type="number"
            v-model.number="model.amount"
          />
        </div>
        <div class="flex-1">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-8"
            for="currency"
          >
            Currency
          </label>
          <div class="relative">
            <select
              class="block appearance-none w-full bg-gray-300 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray"
              id="currency"
              v-model="model.currency"
            >
              <option value="ARS">ARS</option>
              <option value="USD">USD</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <CarretDown />
            </div>
          </div>
        </div>
      </div>
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-8"
        >Tags</label
      >
      <tags v-model="model.tags"></tags>
      <div class="flex mt-8">
        <button
          class="flex-1 mr-4 bg-indigo-500 hover:bg-indigo-600 text-white uppercase text-xs pb-2 pt-3 px-4 border-b-4 border-indigo-700 hover:border-indigo-800 rounded"
          :class="{
            'cursor-not-allowed opacity-50': !allFieldsCompleted,
            spinner: busy
          }"
          :disabled="!allFieldsCompleted"
          @click="submit()"
        >
          {{ this.mode === "create" ? "Add" : "Update" }} Entry
        </button>
        <button
          class="flex-1 border-red-500 border bg-transparent text-red-500 hover:bg-red-500 hover:text-white uppercase text-xs py-2 px-4 rounded"
          @click="close()"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import clone from "lodash/clone";
import CarretDown from "@/components/CarretDown";
import Tags from "@/components/Tags";

export default {
  components: { CarretDown, Tags },
  data() {
    return {
      show: false,
      busy: false,
      mode: null,
      model: null
    };
  },
  mounted() {
    this.prepareForCreate();
  },
  computed: {
    modelSkeleton() {
      return {
        currency: null,
        description: null,
        amount: null,
        plan: null,
        tags: []
      };
    },
    allFieldsCompleted() {
      return Object.values(this.model).every(val => val !== null && val !== "");
    }
  },
  methods: {
    ...mapActions(["addEntry", "updateEntry"]),
    prepareForCreate() {
      this.mode = "create";
      this.model = clone(this.modelSkeleton);
    },
    prepareForEdit(entry) {
      this.mode = "edit";
      this.model = clone(entry);
    },
    open(entry = null) {
      if (entry) {
        this.prepareForEdit(entry);
      }
      this.show = true;
    },
    close() {
      this.prepareForCreate();
      this.show = false;
      this.busy = false;
    },
    submit() {
      this.busy = true;

      (this.mode === "create"
        ? this.addEntry(this.model)
        : this.updateEntry(this.model)
      ).then(() => this.close());
    }
  }
};
</script>

<style scoped>
.bg-whitesmoke {
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}
</style>
