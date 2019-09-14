<template>
  <div class="home">
    <header>
      <h1>{{ title }}</h1>
      <div id="searchBar" class="components-input-demo-presuffix">
        <a-input-search
          id="searchInput"
          placeholder="Tapez votre recette..."
          @search="onSearch"
          enterButton
          size="large"
        >
          <a-icon type="search" />
        </a-input-search>
      </div>
    </header>
    <main>
      <section id="filtersContainer">
        <h2>Filtrer vos recettes par :</h2>
        <div id="flitersContent">
          <a-dropdown>
            <a-menu slot="overlay" @click="handleMenuClick">
              <a-menu-item key="1"><a-icon type="user" />Padawan</a-menu-item>
              <a-menu-item key="2"><a-icon type="user" />Jedi</a-menu-item>
              <a-menu-item key="3"><a-icon type="user" />Maître</a-menu-item>
            </a-menu>
            <a-button class="filterButton">
            Difficulté <a-icon type="down" />
            </a-button>
          </a-dropdown>
          <a-dropdown>
            <a-menu slot="overlay" @click="handleMenuClick">
              <a-menu-item key="1"><a-icon type="user" />1-2</a-menu-item>
              <a-menu-item key="2"><a-icon type="user" />3-4</a-menu-item>
              <a-menu-item key="3"><a-icon type="user" />5-6</a-menu-item>
              <a-menu-item key="4"><a-icon type="user" />7+</a-menu-item>
            </a-menu>
            <a-button class="filterButton">
            Nombre de personnes <a-icon type="down" />
            </a-button>
          </a-dropdown>
          <a-dropdown>
            <a-menu slot="overlay" @click="handleMenuClick">
              <a-menu-item key="1"><a-icon type="user" />{{ lessquarter }}</a-menu-item>
              <a-menu-item key="2"><a-icon type="user" />15-30min.</a-menu-item>
              <a-menu-item key="3"><a-icon type="user" />30-60min.</a-menu-item>
              <a-menu-item key="4"><a-icon type="user" />60-120min.</a-menu-item>
              <a-menu-item key="5"><a-icon type="user" />+120min.</a-menu-item>
            </a-menu>
            <a-button class="filterButton">
            Temps de préparation <a-icon type="down" />
            </a-button>
          </a-dropdown>
        </div>
      </section>
      <section id="listOfRecipes">

      </section>
    </main>
    <footer>
      <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {

  // typage (avec typescript) de la variable title
  title: string = 'Avec la Cantina, innovez sur les recettes issues de la culture populaire !'

  lessquarter: string = '<15min.'

  onSearch (searchValue?: string): void {
    console.log(searchValue)
  }

  handleMenuClick(filterValue?: string): void {
    console.log('click', filterValue)
  }

}

</script>

<style>
  
  #searchBar {
    width: 300px
  }

  a-icon[type="search"] {
    cursor: pointer;
  }

  .filterButton {
    margin-left: 8px
  }
  
</style>
