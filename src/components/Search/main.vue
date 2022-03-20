<template>
  <div class="row mb-1">
    <div
      class="col-12 input-group"
      :class="{'was-validated': erroSearch !== null}"
    >
      <input
        type="text"
        class="form-control"
        v-model="search"
        :placeholder="placeholder"
        @keypress.enter="clickSearch"
        required
      />
      <button
        class="btn btn-outline-secondary"
        type="button"
        @click.prevent="clickSearch"
      >
        <uil-search />
      </button>
      <div
        class="invalid-feedback"
        v-if="erroSearch !== ''"
      >
        {{ erroSearch }}
      </div>
    </div>
  </div>
</template>
<script>
import { UilSearch } from '@iconscout/vue-unicons'
export default {
  name: 'dgSearch',
  components: { UilSearch },
  props: {
    placeholder: String,
  },
  data() {
    return {
      search: null,
      erroSearch: null,
    }
  },
  methods: {
    validField() {
      const obg = "Campo obrigatório"
      let passou = true

      this.erroSearch = null

      if (!this.search) {
        this.erroSearch = obg
        passou = false
      }
      
      return passou
    },
    clickSearch() {
      if (this.validField()) {
        this.$emit('fetch', this.search)
      }
    }
  }
}
</script>