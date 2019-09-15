<template>
  <div class="home">
    <header class="headerHome">
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
      <section class="filtersContainer">
        <h2>Filtrer vos recettes par :</h2>
        <div class="filtersContent">
          <a-dropdown class="filterContent">
            <a-menu slot="overlay" @click="handleMenuClick">
              <a-menu-item key="1"><a-icon type="user" />Padawan</a-menu-item>
              <a-menu-item key="2"><a-icon type="user" />Jedi</a-menu-item>
              <a-menu-item key="3"><a-icon type="user" />Maître</a-menu-item>
            </a-menu>
            <a-button class="filterButton">
            Difficulté <a-icon type="down" />
            </a-button>
          </a-dropdown>
          <a-dropdown class="filterContent">
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
          <a-dropdown class="filterContent">
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
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
      </section>
    </main>
    <footer>
      <a-icon type="plus-circle" class="buttonAddRecipe" />
    </footer>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import RecipeCard from '@/components/RecipeCard.vue';
import axios from 'axios'

@Component({
  components: {
    HelloWorld,
    RecipeCard
  }
})
export default class Home extends Vue {

  // typage (avec typescript) de la variable title
  title: string = 'Avec la Cantina, innovez sur les recettes issues de la culture populaire !'

  lessquarter: string = '<15min.'

  info: any = null

  onSearch (searchValue?: string): void {
    console.log(searchValue)
  }

  handleMenuClick(filterValue?: string): void {
    console.log('click', filterValue)
  }

  mounted() {
            axios
                .get('http://localhost:9000/api/recipes')
                .then(response => (this.info = response))
                .catch(error => {
                    this.info = error
                })
              console.log(this.info)
            
        }

}

</script>

<style>

  .headerHome {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 10%;
  }

  #searchBar {
    width: 300px
  }

  .filtersContainer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 5%;
    margin-bottom: 5%;
  }
  
  a-icon[type="search"] {
    cursor: pointer;
  }

  .filterButton {
    margin-left: 8px
  }

  #listOfRecipes {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap-reverse;
  }

  footer {
    display: flex !important;
    justify-content: flex-end !important;
    align-items: center !important;
    position: fixed !important;
    bottom: 0;
    height: 100px;
    width: 100%;
    padding-right: 5% !important;
  }

  .buttonAddRecipe {
    font-size: 50px;
  }

  @media screen and (max-width: 1280px) {
    .headerHome {
      flex-direction: column;
    }

    #searchBar {
    width: 400px
  }
  }

  @media screen and (max-width: 760px) {
    h1 {
      padding-left: 5%;
      padding-right: 5%;
    }

    #searchBar {
      width: 300px
    }

    .filtersContainer {
      align-items: center;
      margin-left: 0;
    }

  }

  @media screen and (max-width: 600px) {
    h1 {
      font-size: 1.5em;
    }

    #searchBar {
      width: 220px
    }

    .filtersContent {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .filterContent {
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      margin-bottom: 10px;
      padding-left: 5px;
      padding-right: 5px;
      width: 220px;
    }
  }
  
</style>
