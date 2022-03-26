<template>
  <div>
    <a-button
      size="small"
      :type="`${typeButton}`"
      :disabled="disabled"
      @click="$emit('click-button')"
      :loading="loading"
      :icon="icon"
    >
      <span class="display-none">{{ text }}</span> 
      <small>({{ length }})</small>
    </a-button>
  </div>
</template>
<script>
export default {
  props: {
    icon: String,
    text: String,
    length: Number,
    typeButton: String,
    loading: Boolean,
    disabled: Boolean
  },
}
</script>
<style lang="scss" scoped>
.display-none {
  @media screen and (max-width: 576px) {
    display: none;
  }
}
</style>