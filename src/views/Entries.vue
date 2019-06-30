<template>
  <div class="container mx-auto">
    <div class="my-6">
      <button
        class="bg-indigo hover:bg-indigo-light text-white uppercase text-xs pb-2 pt-3 px-4 border-b-4 border-indigo-dark hover:border-indigo rounded"
        @click="$refs.modal.open()"
      >
        New Entry
      </button>
    </div>
    <div class="flex">
      <EntriesTable
        :entries="entries({ plan: 'monthly' })"
        @editEntry="openEntryModal"
        plan="monthly"
      />
    </div>
    <!-- Modal -->
    <EntryModal ref="modal" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import EntriesTable from "@/components/EntriesTable";
import EntryModal from "@/components/EntryModal";

export default {
  components: { EntriesTable, EntryModal },
  computed: {
    ...mapGetters(["entries"])
  },
  methods: {
    openEntryModal(e) {
      this.$refs.modal.open(e);
    }
  }
};
</script>
