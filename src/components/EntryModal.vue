<template>
  <div>
    <button
      class="bg-indigo hover:bg-indigo-light text-white uppercase text-xs pb-2 pt-3 px-4 border-b-4 border-indigo-dark hover:border-indigo rounded"
      @click="show = !show"
    >
      New Entry
    </button>
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
              >
                <option value="income">Income</option>
                <option value="outcome">Outcome</option>
              </select>
              <div
                class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker"
              >
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                  />
                </svg>
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
              >
                <option value="income">Monthly</option>
                <option value="outcome">Yearly</option>
              </select>
              <div
                class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker"
              >
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                  />
                </svg>
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
        />
        <!-- Amount & Currency -->
        <div class="flex">
          <div class="flex-1 mr-4">
            <label
              class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2 mt-8"
              for="amount"
            >
              Amount
            </label>
            <input
              id="amount"
              class="appearance-none block w-full bg-grey-lighter text-grey-darkest border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
              type="number"
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
              >
                <option value="ars">ARS</option>
                <option value="usd">USD</option>
              </select>
              <div
                class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker"
              >
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <!-- Submit -->
        <div class="flex mt-8">
          <button
            class="flex-1 mr-4 bg-indigo hover:bg-indigo-light text-white uppercase text-xs pb-2 pt-3 px-4 border-b-4 border-indigo-dark hover:border-indigo rounded"
            @click="addEntry"
          >
            Add Entry
          </button>
          <button
            class="flex-1 border-red-light border bg-transparent text-red-light hover:bg-red-light hover:text-white uppercase text-xs pb-2 pt-3 px-4 rounded"
            @click="show = false"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  },
  methods: {
    addEntry() {
      //
    }
  }
};
</script>
