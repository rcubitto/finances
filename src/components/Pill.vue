<template>
  <div :class="css">
    <slot>
      <p
        v-if="title"
        class="text-2xl"
        :class="`text-${color}-lightest`"
      >
        {{ title }}
      </p>
      <span
        v-if="subtitle"
        :class="`text-${color}-lighter`"
      >
        {{ subtitle }}
      </span>
    </slot>
  </div>
</template>

<script>
export default {
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
        `bg-${this.color} rounded p-6 overflow-hidden shadow-md` +
        (this.extraCss ? ` ${this.extraCss}` : "")
      );
    }
  }
};
</script>
