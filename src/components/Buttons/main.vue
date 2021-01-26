<template>
  <div>
    <button
      :class="`btn btn-sm ${typeButton}`"
      :disabled="disabled"
      title="Repos"
      @click="$emit('click-button')"
    >
      <components :is="icon" />
      <span class="display-none">{{ text }}</span>
      <span
        class="spinner-border spinner-border-sm"
        role="status"
        v-if="loading"
      >
      </span> 
      <small v-else>({{ length }})</small>
    </button>
  </div>
</template>
<script>
import {
  UilStar,
  UilFolderOpen
} from '@iconscout/vue-unicons' 
export default {
  components: {
    UilStar,
    UilFolderOpen 
  },
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