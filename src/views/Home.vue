<template>
  <div class="home">
    <header class="headerHome">
      <h1>Cantina</h1>
      <h2 class="h2">{{ text }}</h2>

      <!-- Barre de recherche -->

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

          <!-- champ du filtre de la difficulté  -->

          <a-dropdown class="filterContent">
            <a-menu slot="overlay" @click="getDifficulty">
              <a-menu-item key="1"><a-icon type="smile" />Padawan</a-menu-item>
              <a-menu-item key="2"><a-icon type="meh" />Jedi</a-menu-item>
              <a-menu-item key="3"><a-icon type="frown" />Maître</a-menu-item>
            </a-menu>
            <a-button class="filterButtons">
            Difficulté <a-icon type="down" />
            </a-button>
          </a-dropdown>

          <!-- champ du filtre du nombre de personnes  -->

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
            <a-button class="filterButtons">
            Nombre de personnes <a-icon type="down" />
            </a-button>
          </a-dropdown>

          <!-- champ du filtre du temps maximum  -->

          <a-dropdown class="filterContent">
            <a-menu slot="overlay" @click="getTime">
              <a-menu-item key="1"><a-icon type="clock-circle" />20</a-menu-item>
              <a-menu-item key="2"><a-icon type="clock-circle" />40</a-menu-item>
              <a-menu-item key="3"><a-icon type="clock-circle" />60</a-menu-item>
              <a-menu-item key="4"><a-icon type="clock-circle" />90</a-menu-item>
              <a-menu-item key="5"><a-icon type="clock-circle" />120</a-menu-item>
            </a-menu>
            <a-button class="filterButtons">
            Durée maximum en minutes <a-icon type="down" />
            </a-button>
          </a-dropdown>

          <!-- bouton qui lance le filtrage  -->
          <button @click="toChangeList" id="filterButton" class="toSort">Filtrer</button>
          <!-- bouton qui remet toutes les recettes avant(s) filtrage(s)  -->
          <button @click="toResetList" id="resetButton" class="toSort">Reset</button>
        </div>
      </section>
      <section id="listOfRecipes">

        <!-- Ensemble des 'cartes' de recette, filtées ou non  -->

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
      <!--  Bouton d'ajout de recette -->
      <router-link to="/edit">
        <a-icon type="plus-circle" class="buttonAddRecipe" />
      </router-link>
    </footer>
  </div>
</template>

<script lang="ts">

/* import des composants et modules */ 

import { Component, Vue } from 'vue-property-decorator';
import RecipeCard from '@/components/RecipeCard.vue';
import axios from 'axios'

@Component({
  components: {
    RecipeCard
  }
})
export default class Home extends Vue {

  // typage des variables 

  text: string = 'Avec la Cantina, innovez sur les recettes issues de la culture populaire !'
  lessquarter: string = '<15min.'
  info: any = null
  listOfRecipes: any = []
  newList?: any = []
  listChanged: boolean = false;
  filterByName?: string;
  filterByDifficulty?: string;
  filterByPersons?: number;
  filterByTime?: number;

  /* typage des fonctions et de leurs paramètres */ 

  /* AFFECTE LES CONDITIONS DU FILTRAGE */ 


  getName (searchValue?: string): void {
    
    this.filterByName = searchValue
  }

  getDifficulty(filterValue?: any): void {
    
    if(filterValue.key === "1") {
      this.filterByDifficulty = "padawan"
    } else if(filterValue.key === "2") {
      this.filterByDifficulty = "jedi"
    } else if(filterValue.key === "3") {
      this.filterByDifficulty = "maitre"
    }
    
    
  }

  getPersons(filterValue?: any): void {
    
    this.filterByPersons = Number(filterValue.key)
    
  }

  getTime(filterValue?: any): void {
    
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

  /* CHANGE LE TABLEAU D'OBJETS PRIS EN COMPTE POUR L'AFFICHAGE DES RECETTES,
    SOIT LES TABLEAUX TRIES OU LES TABLEAUX AVANT TRIAGE */
  
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
    
  }

  /** REAFFICHE LES LISTES AVANT TRI */

  toResetList() : void {
    this.listChanged = false;
  }

  /** FAIT APPEL A TOUTES LES RECETTES DU SERVEUR AU MOMENT DU MONTAGE DE HOME */

  mounted() {
            axios
                .get('http://localhost:9000/api/recipes')
                .then(response => (this.listOfRecipes = response.data))
                .catch(error => {
                    this.info = error
                    alert("errorMessage : " + this.info)
                })
              
            
        }

}

</script>

<style>

  .headerHome {
    display: flex !important;
    justify-content: space-around !important;
    align-items: center;
    position: relative !important;
    margin-bottom: 10%;
    margin-top: 5%;
  }

  h1 {
    font-size: 3em;
    font-style: italic;
    color: #54a;
    text-shadow: 0 0 0.5em #87F, 0 0 0.5em #87F, 0 0 0.5em #87F;
  }

  .h2 {
    font-size: 1.8em;
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

  .filtersContent {
    display: flex;
    align-items: center;
  }
  
  a-icon[type="search"] {
    cursor: pointer;
  }

  .filtersButton {
    margin-left: 8px
  }

  .toSort {
    margin-left: 8px;
    width: 100px;
    font-size: 1.5em;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
  }

  #filterButton {
    background-color: #1890ff;
  }

  #resetButton {
    background-color: red;
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

  /** MEDIA QUERIES */

  @media screen and (max-width: 1280px) {
    .headerHome {
      flex-direction: column;
    }

    #searchBar {
    width: 400px
  }
  }

  /** MEDIA QUERIES */

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
