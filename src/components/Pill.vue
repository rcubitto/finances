<template>
  <div :class="css">
    <slot>
      <div class="flex justify-between items-center">
        <div v-if="title || subtitle" class="flex flex-col">
          <p v-if="title" class="text-2xl" :class="`text-${color}-lightest`">
            {{ title }}
          </p>
          <span v-if="subtitle" :class="`text-${color}-lighter`">
            {{ subtitle }}
          </span>
        </div>
        <DollarIcon
          :circle-color="`text-${color}-dark`"
          :sign-color="`text-${color}-lighter`"
          size="10"
        />
      </div>
    </slot>
  </div>
</template>

<script>
import DollarIcon from "@/components/DollarIcon";
export default {
  components: { DollarIcon },
  props: {
    color: {
      type: String,
      required: true
    },
    extraCss: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    subtitle: {
      type: String,
      default: null
    }
  },
  computed: {
    css() {
      return (
        `bg-${this.color} rounded p-6 overflow-hidden shadow-md flex-1` +
        (this.extraCss ? ` ${this.extraCss}` : "")
      );
    }
  }
};
</script>
