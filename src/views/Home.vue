<template>
  <div class="home">
    <header class="headerHome">
      <h1>{{ title }}</h1>
      <div id="searchBar" class="components-input-demo-presuffix">
        <a-input-search
          id="searchInput"
          placeholder="Tapez votre recette..."
          @search="getName"
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
            <a-menu slot="overlay" @click="getDifficulty">
              <a-menu-item key="1"><a-icon type="user" />Padawan</a-menu-item>
              <a-menu-item key="2"><a-icon type="user" />Jedi</a-menu-item>
              <a-menu-item key="3"><a-icon type="user" />Maître</a-menu-item>
            </a-menu>
            <a-button class="filterButton">
            Difficulté <a-icon type="down" />
            </a-button>
          </a-dropdown>
          <a-dropdown class="filterContent">
            <a-menu slot="overlay" @click="getPersons">
              <a-menu-item key="1"><a-icon type="user" />1</a-menu-item>
              <a-menu-item key="2"><a-icon type="user" />2</a-menu-item>
              <a-menu-item key="3"><a-icon type="user" />3</a-menu-item>
              <a-menu-item key="4"><a-icon type="user" />4</a-menu-item>
              <a-menu-item key="5"><a-icon type="user" />5</a-menu-item>
              <a-menu-item key="6"><a-icon type="user" />6</a-menu-item>
              <a-menu-item key="7"><a-icon type="user" />7</a-menu-item>
              <a-menu-item key="8"><a-icon type="user" />8</a-menu-item>
            </a-menu>
            <a-button class="filterButton">
            Nombre de personnes <a-icon type="down" />
            </a-button>
          </a-dropdown>
          <a-dropdown class="filterContent">
            <a-menu slot="overlay" @click="getTime">
              <a-menu-item key="1"><a-icon type="user" />20</a-menu-item>
              <a-menu-item key="2"><a-icon type="user" />40</a-menu-item>
              <a-menu-item key="3"><a-icon type="user" />60</a-menu-item>
              <a-menu-item key="4"><a-icon type="user" />90</a-menu-item>
              <a-menu-item key="5"><a-icon type="user" />120</a-menu-item>
            </a-menu>
            <a-button class="filterButton">
            Durée maximum en minutes <a-icon type="down" />
            </a-button>
          </a-dropdown>
          <button @click="toChangeList">Filtrer</button>
        </div>
      </section>
      <section id="listOfRecipes">

        <RecipeCard v-if="listChanged === false"
          v-for="recipe in listOfRecipes" 
          v-bind:titleRecipe="recipe.titre" 
          v-bind:descriptionRecipe="recipe.description"
          v-bind:photoRecipe="recipe.photo"
          v-bind:difficultyRecipe="recipe.niveau"
          v-bind:personsRecipe="recipe.personnes"
          v-bind:timeRecipe="recipe.tempsPreparation"
          v-bind:idRecipe="recipe.id"
          v-bind:listRecipes="listOfRecipes"
        />
        <RecipeCard v-if="listChanged === true"
          v-for="recipe in newList" 
          v-bind:titleRecipe="recipe.titre" 
          v-bind:descriptionRecipe="recipe.description"
          v-bind:photoRecipe="recipe.photo"
          v-bind:difficultyRecipe="recipe.niveau"
          v-bind:personsRecipe="recipe.personnes"
          v-bind:timeRecipe="recipe.tempsPreparation"
          v-bind:idRecipe="recipe.id"
          v-bind:listRecipes="newList"
          
        />

      </section>
    </main>
    <footer>
      <a-icon type="plus-circle" class="buttonAddRecipe" />
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RecipeCard from '@/components/RecipeCard.vue';
import axios from 'axios'

@Component({
  components: {
    RecipeCard
  }
})
export default class Home extends Vue {

  // typage (avec typescript) de la variable title

  title: string = 'Avec la Cantina, innovez sur les recettes issues de la culture populaire !'
  lessquarter: string = '<15min.'
  info: any = null
  listOfRecipes: any = []
  newList?: any = []
  listChanged: boolean = false;
  filterByName?: string;
  filterByDifficulty?: string;
  filterByPersons?: number;
  filterByTime?: number;

  

  getName (searchValue?: string): void {
    console.log(searchValue)
    this.filterByName = searchValue
    console.log(this.filterByName)
  }

  getDifficulty(filterValue?: any): void {
    console.log('click', filterValue)
    if(filterValue.key === "1") {
      this.filterByDifficulty = "padawan"
    } else if(filterValue.key === "2") {
      this.filterByDifficulty = "jedi"
    } else if(filterValue.key === "3") {
      this.filterByDifficulty = "maitre"
    }
    console.log(this.filterByDifficulty)
    
  }

  getPersons(filterValue?: any): void {
    console.log('click', filterValue)
    this.filterByPersons = Number(filterValue.key)
    console.log(this.filterByDifficulty)
  }

  getTime(filterValue?: any): void {
    console.log('click', filterValue)
    switch(filterValue.key) {
      case "1": 
        this.filterByTime = 20
        break;
      case "2": 
        this.filterByTime = 40
        break;
      case "3": 
        this.filterByTime = 60
        break;
      case "4": 
        this.filterByTime = 90
        break;
      case "5": 
        this.filterByTime = 120
        break;
    }
  }
  
  toChangeList(): void {
    this.newList = this.listOfRecipes.filter((recipe: any) => {
      if (this.filterByName) {
        if(recipe.titre !== this.filterByName) {return false}
      }
      if(this.filterByDifficulty) {
        if(recipe.niveau != this.filterByDifficulty) {return false}
      }
      if(this.filterByPersons) {
        if(recipe.personnes != this.filterByPersons) {return false}
      }
      if(this.filterByTime) {
        if(recipe.tempsPreparation > this.filterByTime) {return false}
      }
      return true
      
    })

    this.listChanged = true;
    
    console.log(this.listChanged)
    console.log(this.newList)
    
  }

  mounted() {
            axios
                .get('http://localhost:9000/api/recipes')
                .then(response => (this.listOfRecipes = response.data, console.log(this.listOfRecipes)))
                .catch(error => {
                    this.info = error
                    console.log(this.info)
                })
              
            
        }

}

</script>

<style>

  .headerHome {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 10%;
    margin-top: 5%;
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
    flex-wrap: wrap;
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
    cursor: pointer;
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
