<template>
  <div
    v-if="show"
    class="fixed z-10 pin-l pin-t w-full h-full overflow-auto bg-black-light flex items-center justify-center"
  >
    <div class="bg-white rounded p-8 w-1/2">
      <h3
        class="text-grey-darker font-normal border-grey-light border-b mb-5 pb-5"
      >
        New Entry
      </h3>
      <!-- Type & Range -->
      <div class="flex mt-8">
        <div class="flex-1 mr-4">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="type"
          >
            Type
          </label>
          <div class="relative">
            <select
              class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-grey"
              id="type"
              v-model="model.type"
            >
              <option value="income">Income</option>
              <option value="outcome">Outcome</option>
            </select>
            <div
              class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker"
            >
              <CarretDown />
            </div>
          </div>
        </div>
        <div class="flex-1">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="range"
          >
            Range
          </label>
          <div class="relative">
            <select
              class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-grey"
              id="range"
              v-model="model.range"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
            <div
              class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker"
            >
              <CarretDown />
            </div>
          </div>
        </div>
      </div>
      <!-- Description -->
      <label
        class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2 mt-8"
        for="description"
      >
        Description
      </label>
      <input
        id="description"
        class="appearance-none block w-full bg-grey-lighter text-grey-darkest border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
        type="text"
        v-model="model.description"
      />
      <!-- Amount & Currency -->
      <div class="flex">
        <div class="flex-1 mr-4">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2 mt-8"
            for="amount"
          >
            Amount (in cents)
          </label>
          <input
            id="amount"
            class="appearance-none block w-full bg-grey-lighter text-grey-darkest border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
            type="number"
            v-model.number="model.amount"
          />
        </div>
        <div class="flex-1">
          <label
            class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2 mt-8"
            for="currency"
          >
            Currency
          </label>
          <div class="relative">
            <select
              class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-grey"
              id="currency"
              v-model="model.currency"
            >
              <option value="ARS">ARS</option>
              <option value="USD">USD</option>
            </select>
            <div
              class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker"
            >
              <CarretDown />
            </div>
          </div>
        </div>
      </div>
      <!-- Submit -->
      <div class="flex mt-8">
        <button
          class="flex-1 mr-4 bg-indigo hover:bg-indigo-light text-white uppercase text-xs pb-2 pt-3 px-4 border-b-4 border-indigo-dark hover:border-indigo rounded"
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
          class="flex-1 border-red-light border bg-transparent text-red-light hover:bg-red-light hover:text-white uppercase text-xs pb-2 pt-3 px-4 rounded"
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

export default {
  components: { CarretDown },
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
        range: null,
        type: null
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
      this.model = this.modelSkeleton;
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
