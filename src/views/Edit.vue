<template>
  <div class="edit">
    <router-link to="/" id="linkHome">
      <a-icon type="home" id="iconHome" />
    </router-link>
    <h1>{{ newTitle }}</h1>

    <form
      id="form"
      @submit.prevent="checkForm"
    >

  <p class="labelInputRow">
    <label for="name" class="blueTitle">Name</label>
    <input
      id="name"
      v-model="newRecipe.titre"
      type="text"
      maxlength="30"
    >
  </p>

  <p class="labelInputRow">
    <label for="description" class="blueTitle">Description</label>
    <textarea 
      name="description" 
      id="description" 
      v-model="newRecipe.description"
      cols="50" 
      rows="5"
      maxlength="150"
      placeholder="Court texte descriptif..."
    >

    </textarea>
  </p>


  <div class="diffAndTime">
    <span class="difficutySelect">
        <p class="blueTitle">Difficulté :</p><br />
        <p>
          <input type="radio" v-model="newRecipe.niveau" value="padawan" id="padawan" checked />
          <label for="padawan">Padawan</label>
        </p>
        <br />
        <p>
          <input type="radio" v-model="newRecipe.niveau" value="jedi" id="jedi" />
          <label for="jedi">Jedi</label>
        </p>
        <br />
        <p>
          <input type="radio" v-model="newRecipe.niveau" value="maitre" id="master" />
          <label for="master">Maître</label>
        </p>
        <br />
    </span>

    <p class="inputsTime">
      <label for="time" class="blueTitle">Durée (en minutes) :</label>
      <input type="range" min="0" max="120" v-model.number="newRecipe.tempsPreparation" step="1" />
      <input type="number" v-model.number="newRecipe.tempsPreparation"/>
    </p>
  </div>

   <p class="inputsPersons">
     <label for="persons" class="blueTitle">Pour combien de personnes ?</label>
     <input type="number" id="persons" v-model.number="newRecipe.personnes" min="1" max="8" step="1" />
   </p>

  <div class="infosAdd">
    <p class="titleAdd">
     <b class="blueTitle">Ajouter un ingrédient</b>
     <a-icon type="plus-circle" class="buttonAdd" v-on:click="addIngredient"/>
    </p>
      <!-- liste des ingredients -->
      <div v-for="(ingredient, index) in newRecipe.ingredients" class="ingredientInterface" :key="index">
        <input name="qty" type="text" min="1" max="1000" v-model="ingredient[0]"/>
        <input name="nameIngredient" type="text" maxlength="30" v-model="ingredient[1]"/>
        <a-icon type="close-square" class="closeButton" @click.prevent="deleteIngredient(index)" />
    </div>
    
  </div>
  <div class="infosAdd">
    <p class="titleAdd">
     <b class="blueTitle">Etapes de la recette : </b>
     <a-icon type="plus-circle" class="buttonAdd" v-on:click="addStep"/>
    </p>
      <!-- liste des etapes -->
      <div v-for="(step, index) in newRecipe.etapes" class="stepInterface" :key="index">
        <textarea name="step" rows="3" cols="45" v-model="newRecipe.etapes[index]">

        </textarea>
        <a-icon type="close-square" class="closeButton"  @click.prevent="deleteStep(index)"/>
    </div>
  <div>

    </div>
  </div>

  <div class="editFooter">
    <p class="imgRecipe">
      <label for="srcImg" class="blueTitle">Source de votre photo de recette</label>
      <input type="url" placeholder="http://..." name="srcImg" id="srcImg" v-model="newRecipe.photo"/>
    </p>
    <div class="buttonsFooter">
      <!-- validation du formulaire -->
      <input type="submit" value="Valider" class="buttonFooter" >
      <button v-on:click="testFunc">test</button>
    </div>
  </div>

  <!-- affiche toutes les erreurs de saisie du formulaire -->
  <p v-if="errors.length" class="errorMessage">
    <b class="warning">Veuillez corriger les erreurs suivantes :</b>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
  </p>

</form>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, } from 'vue-property-decorator';
  import axios from 'axios'

  interface objectRecipe {
      id: any,
      titre: string,
      description: string,
      niveau: string,
      personnes: number,
      tempsPreparation: number,
      ingredients: string[][],
      etapes: string[],
      photo?: string
  }
  
  @Component({})

  export default class Edit extends Vue {



    newTitle: string = 'Nouvelle recette'
    editTitle: string = 'Modification de la recette'

    errors: string[] = []
    
    newRecipe: objectRecipe = {
      id: null,
      ingredients: [[]],
      etapes: [],
      titre: "",
      description:  "",
      niveau: "",
      tempsPreparation: 0,
      personnes: 0,
      photo: ""
    }

    
    
    
    

    testFunc() : void {
      /*this.newRecipe.titre = this.titre
      this.newRecipe.description = this.description
      this.newRecipe.niveau = this.difficulty
      this.newRecipe.personnes = Number(this.persons)
      this.newRecipe.tempsPreparation = Number(this.timeValue)
      this.newRecipe.ingredients = this.ingredientList
      this.newRecipe.etapes = this.stepList
      this.newRecipe.photo = this.srcImg*/
      console.log(this.newRecipe)
    }

    /** Ajoute un tableau (ingredient) au tableau (liste des ingredients) */

    addIngredient(index: number) : void {
      this.newRecipe.ingredients.push(["", ""])

    }

    /** supprime l'element du tableau ingredientList avec l'index voulu */

    deleteIngredient(index: number) : void {
      this.newRecipe.ingredients.splice(index, 1)
    }

    /** Ajoute un tableau (etape) au tableau (liste des etapes) */

    addStep() : void {
      this.newRecipe.etapes.push("")
    }

    /** supprime l'element du tableau stepList avec l'index voulu */

    deleteStep(index: number) : void {
      this.newRecipe.etapes.splice(index, 1)
    }

    checkForm() : any {

      this.errors = [];

      if (!this.newRecipe.titre) {
        this.errors.push('Nom de la recette requis');
      }

      if (!this.newRecipe.description) {
        this.errors.push('Description de la requette requise');
      }
      if (!this.newRecipe.niveau) {
        this.errors.push('Difficulté de la recette requise');
      }
      if (!this.newRecipe.tempsPreparation || this.newRecipe.tempsPreparation < 0 || (!isFinite(this.newRecipe.tempsPreparation) )) {
        this.errors.push('Temps de préparation requis, celui-ci doit être entier et positif');
      }
      if (!this.newRecipe.personnes || this.newRecipe.personnes < 0 || (!isFinite(this.newRecipe.personnes))) {
        this.errors.push('Nombre de personne(s) requis, celui-ci doit être entier et positif');
      }

      if(this.newRecipe.etapes.length === 0) {
        this.errors.push('La recette doit suivre au moins une étape')
      }

      if(this.newRecipe.ingredients.length === 0) {
        this.errors.push('La recette doit contenir au moins une recette')
      }

      if (!this.errors.length && this.newRecipe.etapes.length > 0 && this.newRecipe.ingredients.length > 0 ) {
        axios
        .post('http://localhost:9000/api/recipes/', this.newRecipe)
        .then(response => (console.log(response)))
        .catch(error => {
          console.log(error)
      })
      }

      


    }


    
    
  }

</script>

<style>
  

  .edit {
    margin: 0 auto;
    width: 100%;
    font-size: 1.5em;
  }

  #linkHome {
    position: absolute;
    top: 1%;
    right: 1%;
  }

  #iconHome {
    font-size: 90px;
  }

  h1 {
    margin-top: 5%;
    color: #54a;
    text-shadow: 0 0 0.5em #87F, 0 0 0.5em #87F, 0 0 0.5em #87F;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin: 0 auto;
    padding: 2%;
    width: 60%;
    background-color: #F7F7FA;
    border: 2px black solid;
    border-radius: 50px;
  }

  .blueTitle {
    font-weight: bold;
    color: #1890ff;
  }

  .labelInputRow {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 4%;
    width: 100%;
    border: gainsboro 2px solid;
    border-style: inset;
    border-radius: 25px;
  }

  .diffAndTime {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    border: gainsboro 2px solid;
    border-style: inset;
    border-radius: 25px;
    margin-bottom: 5%;
    padding-top: 2%;
  }

  .difficutySelect {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }

  .difficutySelect input {
    margin: 8px;
  }

  .inputsTime {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    height: 200px;
  }

  .inputsTime input {
    margin-left: 30px;
  }

  .inputsPersons {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    border: gainsboro 2px solid;
    border-style: inset;
    border-radius: 25px;
    padding: 4%;
  }
  
  .inputsPersons input {
    margin-left: 30px;
  }

  .infosAdd {
    margin-bottom: 3%;
    padding: 4%;
    width: 100%;
    border: gainsboro 2px solid;
    border-style: inset;
    border-radius: 25px;
  }

  .titleAdd {
    display: flex;
    align-items: center;
  }

  .buttonAdd {
    margin-left: 30px;
    font-size: 34px;
    cursor: pointer;
  }

  .editFooter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4%;
    width: 100%;
    border: gainsboro 2px solid;
    border-style: inset;
    border-radius: 25px;
  }

  .imgRecipe {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 200px;
  }

  .buttonsFooter {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 200px;
  }

  .buttonFooter {
    width: 200px;
    height: 50px;
    background-color: #54a;
    color: white;
    border: none;
    font-size: 1.4em;
    border-radius: 10px;
    cursor: pointer;
  }

  .errorMessage {
    display: flex !important;
    flex-direction: column !important;
    margin: 0 auto !important;
    margin-bottom: 5% !important;
  }

  .warning {
    color: red;
  }

  /** MEDIA QUERIES */

  @media screen and (max-width: 1040px) {

    #iconHome {
      font-size: 75px;
    }

    form {
      width: 75%;
    }

    #description {
      width: 80%;
    }
  }

  /** MEDIA QUERIES */

  @media screen and (max-width: 880px) {
    .edit {
      font-size: 1.2em;
    }

    #iconHome {
      font-size: 60px;
    }

    form {
      width: 85%;
    }

    .diffAndTime {
      flex-direction: column !important;
      justify-content: space-between !important;
      align-items: center !important;
      height: 500px;
    }

    .inputsTime input {
      margin-left: 0;
    }

    .inputsPersons {
      justify-content: center;
    }

    .editFooter {
      flex-direction: column;
    }

    .buttonsFooter {
      
      justify-content: space-around;
    }
  }
</style>
