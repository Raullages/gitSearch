<template>
  <div>
     <ul class="cards">
        <li
          class="cards__norespository"
          v-if="repos.length === 0"
        >
          <h2>Nenhum repositório encontrado.</h2>
        </li>
        <li
          class="cards__item animate__animated animate__fadeInUp animate__fast"
          v-for="item in repos"
          :key="item.id"
        >
          <div>
            <div class="cards__clone">
              <h2>{{ item.name }}</h2>
              <a
                :href="item.html_url"
                target="_blank"
                title="Ir para o repositório"
              >
                <uil-external-link-alt size="16px" />
              </a>
            </div>
            <div class="cards__description">
              <h4>{{ item.description ? item.description : 'Sem descrição' }}</h4>
            </div>
          </div>
          <div class="cards__actions">
            <span title="Watch">
              <uil-eye />
              {{ item.watchers_count }}
            </span>
            <span title="Star">
              <uil-star />
              {{ item.stargazers_count }}
            </span>
            <span title="Fork">
              <uil-code-branch class="logo" />
              {{ item.forks_count }}
            </span>
            <span title="Issues">
              <uil-exclamation-circle/>
              {{ item.open_issues_count }}
            </span>
          </div>
        </li>
      </ul>
  </div>
</template>
<script>
import 'animate.css'
import {
  UilCodeBranch,
  UilStar,
  UilExclamationCircle,
  UilEye,
  UilExternalLinkAlt
} from '@iconscout/vue-unicons'
export default {
  components: {
    UilCodeBranch,
    UilStar,
    UilExclamationCircle,
    UilEye,
    UilExternalLinkAlt
  },
  props: {
    repos: {
      type: Array,
      default() {
        return []
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.cards{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px 0px;
  margin-top: 10px;
  border-top: 1px solid #DDD;
  &__item{
    flex: 1 0;
    min-width: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 3px;
    padding: 10px;
    height: 170px;
    border-radius: 5px;
    background-color: #FFF;
  }
  &__clone {
    display: flex;
    justify-content: space-between;
    h2{
      max-width: 250px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      color: #0f548d;
      text-transform: capitalize;
    }
    a {
      text-decoration: none
    }
  }
  &__description {
    overflow-y: auto;
    height: 80px;
    min-height: 50px;
    h4{
      color: #646464;
      font-weight: 300;
    }
  }
  &__actions {
    border-top: 1px solid #DDD;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #FFF;
    border-radius: 5px;
    padding: 3px 10px;
    span {
      font-size: 16px;
      &:hover{
        cursor: default
      }
      color: #343434;
    }
  }
  &__norespository{
    flex: 1 0 500px;
    text-align: center;
    list-style: none;
  }
}
</style>
