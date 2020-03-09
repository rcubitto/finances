<template>
  <div
    class="w-full bg-gray-300 text-grey-800 border border-gray-300 rounded px-2 flex flex-wrap"
    :class="tags.length > 0 ? 'pt-3 pb-2' : 'py-3'"
  >
    <div
      class="bg-yellow-500 py-2 pl-2 pr-1 rounded mr-2 mb-2 flex items-center"
      v-for="(tag, index) in tags"
      :key="index"
    >
      <span>{{ tag }}</span>
      <button
        class="flex items-center focus:outline-none"
        @click="deleteTag(index)"
      >
        <close-icon></close-icon>
      </button>
    </div>
    <input
      type="text"
      class="focus:outline-none focus:border-gray-500 leading-tight bg-gray-300 focus:bg-gray-300"
      :class="tags.length > 0 ? 'mb-2' : ''"
      v-model="tag"
      @keydown.space.prevent="addTag"
      @keydown.enter.prevent="addTag"
      @keydown.delete="deleteLastTag"
    />
  </div>
</template>

<script>
import CloseIcon from "@/components/CloseIcon";
import clone from "lodash/clone";

export default {
  components: { CloseIcon },
  props: ["value"],
  data() {
    return {
      tag: null,
      tags: []
    };
  },
  mounted() {
    this.tags = clone(this.value || []);
  },
  methods: {
    addTag(event) {
      const tag = event.target.value;

      if (this.tags.includes(tag)) {
        return;
      }

      this.tags.push(tag);
      this.tag = null;

      this.$emit("input", this.tags);
    },
    deleteTag(index) {
      this.tags.splice(index, 1);
      this.$emit("input", this.tags);
    },
    deleteLastTag(event) {
      if (event.target.value === "" && this.tags.length > 0) {
        this.deleteTag(this.tags.length - 1);
        event.preventDefault();
      } else {
        // delete character as usual
      }
    }
  }
};
</script>
