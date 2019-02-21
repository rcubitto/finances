<template>
  <div class="container mx-auto mt-6 flex">
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
</template>

<script>
import { mapGetters } from "vuex";
import EntriesTable from "@/components/EntriesTable";

export default {
  components: { EntriesTable },
  computed: {
    ...mapGetters(["entriesByRange"])
  }
};
</script>
