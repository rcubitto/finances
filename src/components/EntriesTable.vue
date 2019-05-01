<template>
  <div :class="css">
    <table class="w-full">
      <thead>
        <tr
          :class="
            `bg-${color}-lightest border-b-4 border-${color}-lighter uppercase text-${color}-light tracking-wide text-xs font-bold`
          "
        >
          <th class="text-left p-4">Description → [{{ range }}]</th>
          <th class="text-right p-4">
            U$S
          </th>
          <th class="text-right p-4">
            AR$
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(entry, index) in entries"
          :key="index"
          class="text-grey-darkest"
          :class="{ 'bg-grey-lighter': index % 2 === 1 }"
        >
          <td class="p-4">{{ entry.description }}</td>
          <td class="text-right p-4">
            {{ convert(entry.amount, entry.currency).toUSD() }}
          </td>
          <td class="text-right p-4">
            {{ convert(entry.amount, entry.currency).toARS() }}
          </td>
          <td class="flex justify-center items-center p-4">
            <button
              @click="editEntry(entry)"
              class="flex justify-center items-center focus:outline-none"
            >
              <EditIcon color="blue" />
            </button>
            <button
              @click="setAndDelete(entry)"
              class="flex justify-center items-center focus:outline-none w-5"
              :class="deleting == entry._id ? 'spinner' : ''"
            >
              <TrashIcon v-if="deleting !== entry._id" color="red" />
            </button>
          </td>
        </tr>
        <tr
          v-if="entries.length > 0"
          class="text-grey-darkest font-bold bg-grey-light"
        >
          <td class="text-left p-4">
            Total
          </td>
          <td class="text-right p-4">
            {{ totalInUSD }}
          </td>
          <td class="text-right p-4">
            {{ totalInPesos }}
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import convert from "@/lib/Converter";
import money from "@/lib/Money";
import _ from "lodash";
import EditIcon from "@/components/EditIcon";
import TrashIcon from "@/components/TrashIcon";

export default {
  components: { TrashIcon, EditIcon },
  props: {
    entries: {
      type: Array,
      required: true
    },
    range: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: "red"
    },
    extraCss: {
      type: String,
      default: null
    }
  },
  data: () => ({
    deleting: null
  }),
  computed: {
    css() {
      return `rounded overflow-hidden shadow ${this.extraCss || ""}`.trim();
    },
    totalInPesos() {
      const amount = _(this.entries)
        .map(entry =>
          money(entry)
            .exchangeToPesos()
            .getCents()
        )
        .sum();

      return money({ amount }).format();
    },
    totalInUSD() {
      const amount = _(this.entries)
        .map(entry =>
          money(entry)
            .exchangeToDollars()
            .getCents()
        )
        .sum();

      return money({ amount }).format();
    }
  },
  methods: {
    ...mapActions(["deleteEntry"]),
    convert,
    editEntry(entry) {
      this.$emit("editEntry", entry);
    },
    setAndDelete(entry) {
      this.deleting = entry._id;
      this.deleteEntry(entry);
    }
  }
};
</script>
