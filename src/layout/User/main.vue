<template>
  <div class="col-12 card">
    <div class="card__user">
      <img
        :src="user.avatar_url"
        width="70"
        alt="avatar"
      />
      <div class="card__infos">
        <div>
          <div class="d-flex align-items-center">
            <h4 class="p-0 m-0">{{ user.login }}</h4>
            <a
              :href="user.html_url"
              target="_blank"
              title="Ir para o Github"
              style="margin-left: 5px;"
            >
              <uil-external-link-alt size="16px" />
            </a>
          </div>
          <div class="d-flex flex-column">
            <small class="text-info">{{ user.type }}</small>
            <small class="text-info">{{ user.email }}</small>
          </div>
        </div>
        <div class="d-flex">
          <dg-buttons
            text="Repos"
            :typeButton="!showRepos ? 'btn-outline-success' : 'btn-success'"
            @click-button="() => {
              showRepos = true;
              showReposStarred = false;
              fetchRepos();
            }"
            :disabled="loadingRepos"
            :loading="loadingRepos"
            :length="repos.length"
            icon="uil-folder-open"
            style="margin-right: 5px"
          />
          <dg-buttons
            text="Starred"
            :typeButton="!showReposStarred ? 'btn-outline-primary' : 'btn-primary'"
            @click-button="() => {
              showRepos = false;
              showReposStarred = true;
              fetchReposStarred();
            }"
            :disabled="loadingStarred"
            :loading="loadingStarred"
            :length="reposStarred.length"
            icon="uil-star"
          />
        </div>
      </div>
    </div>
    <div class="card__bio">
      <small>{{ user.bio ? user.bio : 'Sem biografia' }}</small>
    </div>
    <div
      class="card__search"
      v-if="showRepos || showReposStarred"
    >
      <dg-search
        placeholder="Pesquisar repositórios"
        @fetch="(item) => { dadoInput = item }"
      />
      <div
        v-if="dadoInput"
        class="text-center animate__animated animate__slideInUp"
      > 
        <small v-if="showRepos">
          {{ listFilterRepos.length + ' Repositório(s) encontrado(s).' }}
        </small>
        <small v-if="showReposStarred">
          {{ listFilterReposStarred.length + ' Repositório(s) encontrado(s).' }}
        </small>
        <button
          class="btn btn-sm btn-link"
          type="button"
          @click="dadoInput = null"
        >
          Limpar
        </button>
      </div>
    </div>
    <div v-if="showRepos">
      <dg-list-repos
        name="repos"
        :repos="listFilterRepos"
      />
    </div>
    <div v-if="showReposStarred">
      <dg-list-repos
        name="reposStarred"
        :repos="listFilterReposStarred"
      />
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import 'animate.css'
import { UilExternalLinkAlt } from '@iconscout/vue-unicons'
import dgButtons from '@/components/Buttons/main.vue'
import dgListRepos from '@/components/Repos/main.vue'
import dgSearch from '@/components/Search/main.vue'
export default {
  name: 'dgUser',
  components: {
    UilExternalLinkAlt,
    dgListRepos,
    dgButtons,
    dgSearch
  },
  props: {
    user: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      showRepos: false,
      showReposStarred: false,
      dadoInput: null,
      repos: [],
      reposStarred: [],
      loadingRepos: false,
      loadingStarred: false,
      listFilterRepos: [],
      listFilterReposStarred: [],
    }
  },
  watch: {
    dadoInput(val) {
      this.listFilterRepos = this.repos
      this.listFilterReposStarred = this.reposStarred
      if (val) {
        if (this.showRepos) {
          const listaFiltrada = this.listFilterRepos.filter((item) => item.name.toLowerCase()
            .includes(val.toLowerCase()))
          this.listFilterRepos = listaFiltrada
        }
        if (this.showReposStarred) {
          const listaFiltrada = this.listFilterReposStarred.filter((item) => item.name.toLowerCase()
            .includes(val.toLowerCase()))
          this.listFilterReposStarred = listaFiltrada
        }
      }
    }
  },
  async mounted() {
    if (this.user && this.user.login) {
      await this.fetchRepos()
      this.showRepos = true;
      await this.fetchReposStarred()
      this.showReposStarred = false;
    }
  },
  methods: {
    async fetchRepos() {
      this.loadingRepos = true
      await axios.get(`https://api.github.com/users/${this.user.login}/repos`)
        .then(repos => {
          this.loadingRepos = false
          this.repos = repos.data
          this.listFilterRepos = [...this.repos]
        })
    },
    async fetchReposStarred() {
      this.loadingStarred = true
      await axios.get(`https://api.github.com/users/${this.user.login}/starred`)
        .then(starred => {
          this.loadingStarred = false
          this.reposStarred = starred.data
          this.listFilterReposStarred = [...this.reposStarred]
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.card {
  border: 1px solid #CCC;
  border-radius: 4px;
  &__user {
    padding: 4px;
    width: 100%;
    display: flex;
    align-items: flex-start;
  }
  &__infos {
    padding-left: 4px;
    box-sizing: border-box;
    flex: 1 0 250px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start
  }
  &__bio {
    padding: 5px 5px;
    border-top: 1px solid #DDD;
    border-bottom: 1px solid #DDD;
    small {
      color: #545454;
      font-weight: 400;
    }
  }
  &__search {
    padding: 10px;
  }
}
</style>