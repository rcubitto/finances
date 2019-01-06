<template>
  <div class="flex flex-col justify-center items-center flex-1">
    <p class="text-grey-darker font-bold -mt-4">
      {{ label || "" }}
    </p>
    <div class="border-b-4 w-full border-grey" />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: null
    }
  }
};
</script>
