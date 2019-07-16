<template>
  <div class="container mx-auto">
    <div class="my-6 flex items-center">
      <button
        class="bg-indigo hover:bg-indigo-light text-white uppercase text-xs pb-2 pt-3 px-4 border-b-4 border-indigo-dark hover:border-indigo rounded mr-6"
        @click="$refs.modal.open()"
      >New Entry</button>
      <div>
        <label v-for="(tag, index) in tags" :key="index" class="mr-5 cursor-pointer">
          <input type="checkbox" v-model="tagsToFilter" :value="tag" />
          <span class="ml-1 uppercase text-xs text-grey-darkest">{{ tag }}</span>
        </label>
      </div>
    </div>
    <div class="flex">
      <EntriesTable
        :entries="entries({ plan: 'monthly'  }, tagsToFilter)"
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
    ...mapGetters(["entries", "tags"])
  },
  data() {
    return {
      tagsToFilter: []
    };
  },
  methods: {
    openEntryModal(e) {
      this.$refs.modal.open(e);
    }
  }
};
</script>
