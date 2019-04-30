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
              @click="deleteEntry(entry)"
              class="flex justify-center items-center focus:outline-none"
              :class="deleting == entry._id ? 'spinner' : ''"
            >
              <TrashIcon v-if="deleting !== entry._id" color="red" />
            </button>
          </td>
        </tr>
        <tr class="text-grey-darkest font-bold bg-grey-light">
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
    <EntryModal ref="modal" />
  </div>
</template>

<script>
import convert from "@/lib/Converter";
import money from "@/lib/Money";
import _ from "lodash";
import EntryModal from "@/components/EntryModal";
import EditIcon from "@/components/EditIcon";
import TrashIcon from "@/components/TrashIcon";

export default {
  components: { TrashIcon, EditIcon, EntryModal },
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
    convert,
    editEntry(entry) {
      this.$refs.modal.open(entry);
    },
    deleteEntry(entry) {
      this.deleting = entry._id;
      this.$emit("deleteEntry", entry);
    }
  }
};
</script>
