<template>
  <a-row>
    <a-col :span="24">
      <a-form :form="form">
        <a-form-item>
          <a-input-search
            placeholder="Pesquise pelo usuário"
            @pressEnter="clickSearch"
            allowClear
            size="large"
            v-decorator="[
              'search',
              { rules: [{ required: true, message: 'Campo obrigatório' }] },
            ]"
          >
            <a-icon slot="prefix" type="user" />
          </a-input-search>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>
<script>
export default {
  name: 'dgSearch',
  props: {
    placeholder: String,
  },
  data() {
    return {
      search: null,
      erroSearch: null,
      form: this.$form.createForm(this, { search: 'dynamic_rule'})
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
    clickSearch(e) {
      this.form.validateFields(err => {
        if (!err) {
         this.$emit('fetch', e.target.value)
        }
      });
    }
  }
}
</script>