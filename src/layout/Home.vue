<template>
  <div>
    <div class="bg-github"></div>
    <div class="container-fluid layout">
      <div class="row">
        <div class="col-12 text-center p-3">
          <div class="col-12">
            <img
              src="../assets/github.png"
              width="250"
              alt="github"
            />
          </div>
          <div class="col-12">
            <h5>{{ projectName }}</h5>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <dg-search  
            placeholder="Pesquise pelo usuário"
            @fetch="fetch"
          />
        </div>
        <div class="col-12 mt-4">
          <dg-user
            v-if="user && !loading"
            :user="user"
          />
          <h4 v-if="infoLabel">
            GitHub é uma plataforma de hospedagem de código-fonte e arquivos com controle de versão usando o Git. Ele permite que programadores,
            utilitários ou qualquer usuário cadastrado na plataforma contribuam em projetos privados e/ou Open Source de qualquer lugar do mundo.
          </h4>
        </div>
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
      </div>
    </div>
  </div>
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
      infoLabel: true,
    }
  },
  created() {
    if (this.$route.params.user) {
      this.infoLabel = false
      this.fetch(this.$route.params.user, true)
    } else {
      this.infoLabel = true
    }
  },
  methods: {
    async fetch(user, hasParams = false) {
      if (!hasParams) {
        this.$router.push({
          name: 'Home',
          params: {
            user: user
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
