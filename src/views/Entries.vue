<template>
  <div class="container mx-auto">
    <div class="my-6">
      <button
        class="bg-indigo hover:bg-indigo-light text-white uppercase text-xs pb-2 pt-3 px-4 border-b-4 border-indigo-dark hover:border-indigo rounded"
        @click="$refs.modal.open()"
      >
        New Entry
      </button>
      <EntryModal ref="modal" />
    </div>
    <div class="flex">
      <div class="flex-1 mr-10">
        <EntriesTable
          :entries="entriesByRange('outcome', 'monthly')"
          range="monthly"
        />
      </div>
      <div class="flex-1 flex flex-col">
        <EntriesTable
          :entries="entriesByRange('outcome', 'yearly')"
          range="yearly"
          extra-css="mb-10"
        />
        <EntriesTable
          :entries="entriesByRange('income', 'yearly')"
          range="yearly"
          color="indigo"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import EntriesTable from "@/components/EntriesTable";
import EntryModal from "@/components/EntryModal";

export default {
  components: { EntriesTable, EntryModal },
  computed: {
    ...mapGetters(["entriesByRange"])
  }
};
</script>
