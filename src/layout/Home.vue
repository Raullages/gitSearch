<template>
  <a-row>
    <a-col
      :xs="{ span: 24, offset: 0 }"
      :md="{ span: 12, offset: 6 }"
      style="padding: 10px"
    >
      <a-row>
        <a-col :span="24" style="margin-bottom: 20px">
          <img
            src="../assets/github.png"
            width="250"
            alt="github"
          />
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-tabs  type="card">
            <a-tab-pane key="1" tab="Buscar Repo">
              <h3>{{ projectName }}</h3>
              <dg-search  
                placeholder="Pesquise pelo usuário"
                @fetch="fetch"
              />
              <dg-user
                v-if="user && !loading"
                :user="user"
              />
            </a-tab-pane>
            <a-tab-pane key="2" disabled tab="Comandos do Git" />
          </a-tabs>
        </a-col>
      </a-row>
      <div
        v-if="userError"
        class="d-flex justify-content-center"
      >
        <h4>{{ userError }}</h4>
      </div>
      <div
        v-if="loading"
        class="d-flex justify-content-center"
      >
        <span
          class="spinner-border text-primary"
          role="status"
        >
        </span>
      </div>
      <div v-if="infoLabel">
        <h4 class="text-center">
          <strong>GitHub</strong> é uma plataforma de hospedagem de código-fonte e arquivos com controle de versão usando o Git. 
          Ele permite que programadores, utilitários ou qualquer usuário cadastrado na plataforma contribuam em projetos privados e/ou Open Source de qualquer lugar do mundo.
        </h4>
      </div>
    </a-col>
  </a-row>
</template>
<script>
import axios from 'axios'
import dgSearch from '@/components/Search/main.vue'
import dgUser from '@/layout/User/main.vue'
export default {
  name: 'App',
  components: {
    dgSearch,
    dgUser
  },
  data () {
    return {
      loading: false,
      projectName: 'Repositórios',
      user: null,
      userError: null,
    }
  },
  created() {
    if (this.$route.params.user) {
      this.fetch(this.$route.params.user, true)
    }
  },
  computed: {
    infoLabel() {
      return this.user && !this.loading ? false : true
    }
  },
  methods: {
    async fetch(user, hasParams = false) {
      console.log(user)
      if (!hasParams) {
        this.$router.push({
          name: 'Home',
          params: {
            user,
          }
        })
      }
      this.loading = true
      try {
        await axios.get(`https://api.github.com/users/${user}`)
          .then(user => {
            this.loading = false
            if (user.status === 200) {
              this.user = user.data
              this.userError = null
            }
          })
      } catch (error) {
        console.log(JSON.stringify({"erro": "Usuário não encontrado."}))
        this.user = null
        this.loading = false
        this.userError = 'Usuário não encontrado.'
      }
    },
  }
}
</script>
<style lang="scss">
.bg-github{
  height: 100vh;
  width: 100vw;
  background-image: url('../assets/github.png');
  background-size: 120px;
  background-repeat: initial;
  background-attachment: fixed;
  position: fixed;
  opacity: 0.03;
}
.layout{
  max-width: 576px;
}
</style>
