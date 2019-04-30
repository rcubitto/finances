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
          <td class="p-4">
            {{ entry.description }}
          </td>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="w-5"
              >
                <path
                  class="text-blue-light fill-current"
                  d="M4 14a1 1 0 0 1 .3-.7l11-11a1 1 0 0 1 1.4 0l3 3a1 1 0 0 1 0 1.4l-11 11a1 1 0 0 1-.7.3H5a1 1 0 0 1-1-1v-3z"
                />
                <rect
                  width="20"
                  height="2"
                  x="2"
                  y="20"
                  class="text-blue-dark fill-current"
                  rx="1"
                />
              </svg>
            </button>

            <button
              @click="deleteEntry(entry)"
              class="flex justify-center items-center focus:outline-none"
              :class="deleting == entry._id ? 'spinner' : ''"
            >
              <svg
                v-if="deleting !== entry._id"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="w-5"
              >
                <path
                  class="text-red-light fill-current"
                  d="M5 5h14l-.89 15.12a2 2 0 0 1-2 1.88H7.9a2 2 0 0 1-2-1.88L5 5zm5 5a1 1 0 0 0-1 1v6a1 1 0 0 0 2 0v-6a1 1 0 0 0-1-1zm4 0a1 1 0 0 0-1 1v6a1 1 0 0 0 2 0v-6a1 1 0 0 0-1-1z"
                />
                <path
                  class="text-red-dark fill-current"
                  d="M8.59 4l1.7-1.7A1 1 0 0 1 11 2h2a1 1 0 0 1 .7.3L15.42 4H19a1 1 0 0 1 0 2H5a1 1 0 1 1 0-2h3.59z"
                />
              </svg>
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

export default {
  components: { EntryModal },
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
