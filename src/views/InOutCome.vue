<template>
  <div class="container mx-auto mt-6 flex">
    <div class="flex-1 mr-10">
      <Entries
        :entries="entriesByRange('outcome', 'monthly')"
        range="monthly"
      />
    </div>
    <div class="flex-1 flex flex-col">
      <Entries
        :entries="entriesByRange('outcome', 'yearly')"
        range="yearly"
        extra-css="mb-10"
      />
      <Entries
        :entries="entriesByRange('income', 'yearly')"
        range="yearly"
        color="indigo"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Entries from "@/components/Entries";

export default {
  components: { Entries },
  computed: {
    ...mapGetters(["entriesByRange"])
  }
};
</script>
