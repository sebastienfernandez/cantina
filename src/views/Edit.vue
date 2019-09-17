<template>
  <div class="edit">
    <h1>{{ newTitle }}</h1>
    <form
      id="form"
      @submit="checkForm"
      action="https://vuejs.org/"
      method="post"
      novalidate="true"
    >

  <p class="labelInputRow">
    <label for="name" class="blueTitle">Name</label>
    <input
      id="name"
      v-model="name"
      type="text"
      name="name"
      maxlength="30"
    >
  </p>

  <p class="labelInputRow">
    <label for="description" class="blueTitle">Description</label>
    <textarea 
      name="description" 
      id="description" 
      v-model="description"
      cols="50" 
      rows="5"
      maxlength="150"
    >
    
    </textarea>
  </p>


  <div class="diffAndTime">
    <span class="difficutySelect">
        <p class="blueTitle">Difficulté :</p><br />
        <p><input type="radio" name="difficulty" value="padawan" id="padawan" checked /> <label for="padawan">Padawan</label></p><br />
        <p><input type="radio" name="difficulty" value="jedi" id="jedi" /> <label for="jedi">Jedi</label></p><br />
        <p><input type="radio" name="difficulty" value="master" id="master" /> <label for="master">Maître</label></p><br />
    </span>

    <p class="inputsTime">
      <label for="time" class="blueTitle">Durée (en minutes) :</label>
      <input type="range" min="0" max="120" v-model="timeValue" step="1" id="timeValue" name="timeValue" />
      <input type="number" v-model="timeValue"/>
    </p>
  </div>

   <p class="inputsPersons">
     <label for="persons" class="blueTitle">Pour combien de personnes ?</label>
     <input type="number" id="persons" name="persons" v-model="persons" min="1" max="8" step="1" />
   </p>

  <div class="infosAdd">
    <p class="titleAdd">
     <b class="blueTitle">Ajouter un ingrédient</b>
     <a-icon type="plus-circle" class="buttonAdd" v-on:click="addIngredient" />
    </p>
    <ul>
      <li v-for="ingrediant in ingrediantList">{{ ingrediant }}</li>
      <div v-for="ingrediant in ingrediantList" class="ingredientInterface">
        <input name="qty" type="number" min="1" max="1000"/>
        <select name="mesure" id="mesure">
            <option value="cl">cl</option>
            <option value="mg">mg</option>
            <option value="g">g</option>
            <option value=" "> </option>
        </select>
        <input name="ingredient" type="text" maxlength="30"/>
        <a-icon type="close-square" v-on:click="deleteIngredient" class="closeButton" />
    </div>
    </ul>
  </div>
  <div class="infosAdd">
    <p class="titleAdd">
     <b class="blueTitle">Etapes de la recette : </b>
     <a-icon type="plus-circle" class="buttonAdd" v-on:click="addStep" />
    </p>
    <ul>
      <li v-for="step in stepList">{{ step }}</li>
    </ul>
  <div>

    </div>
  </div>

  <div class="editFooter">
    <p class="imgRecipe">
      <label for="srcImg" class="blueTitle">Source de votre photo de recette</label>
      <input type="url" placeholder="http://..." name="srcImg" id="srcImg" v-model="srcImg"/>
    </p>
    <div class="buttonsFooter">
      <input type="submit" value="Submit" class="buttonFooter" >
    </div>
  </div>

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
  import Ingredient from '@/components/Ingredient.vue';
  import Step from '@/components/Step.vue';
  import axios from 'axios'
  
  @Component({
  components: {
    Ingredient,
    Step
  }
})

  export default class Edit extends Vue {

    newTitle: string = 'Nouvelle recette'
    editTitle: string = 'Modification de la recette'

    errors: string[] = []
    ingrediantList: string[] = []
    stepList: string[] = []
    name: any = null
    description: any = null
    difficulty: any = null
    timeValue: any = null
    persons: any = null
    srcImg: any = null
    
    addIngredient() : void {
      
    }

    addStep() : void {

    }

    checkForm(e?: any) : any {

      this.errors = [];

      if (!this.name) {
        this.errors.push('Nom de la recette requis');
      }

      if (!this.description) {
        this.errors.push('Description de la requette requise');
      }
      if (!this.difficulty) {
        this.errors.push('Difficulté de la recette requise');
      }
      if (!this.timeValue || this.timeValue > 0 || Number.isInteger(this.timeValue) === true) {
        this.errors.push('Temps de préparation requis, celui-ci doit être entier et positif');
      }
      if (!this.persons || this.persons > 0 || Number.isInteger(this.persons) === true) {
        this.errors.push('Nombre de personne(s) requis, celui-ci doit être entier et positif');
      }

      if(this.stepList.length === 0) {
        this.errors.push('La recette doit suivre au moins une étape')
      }

      if(this.ingrediantList.length === 0) {
        this.errors.push('La recette doit contenir au moins une recette')
      }

      if (!this.errors.length && this.stepList.length > 0 && this.ingrediantList.length > 0 ) {
        return true;
      }
      


      e.preventDefault();

      axios
        .post('http://localhost:9000/api/recipes')
        .then(response => (console.log(response), alert("Nouvelle recette crée")))
                .catch(error => {
                    console.log(error)
                })

    }


    
    
  }

</script>

<style>
  

  .edit {
    margin: 0 auto;
    width: 100%;
    font-size: 1.5em;
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

  .errorMessage {
    display: flex !important;
    flex-direction: column !important;
    margin: 0 auto !important;
    margin-bottom: 5% !important;
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
    justify-content: space-between;
    height: 200px;
  }

  .buttonFooter {
    cursor: pointer;
    width: 200px;
    height: 50px;
  }

  @media screen and (max-width: 1040px) {
    form {
      width: 75%;
    }

    #description {
      width: 80%;
    }
  }

  @media screen and (max-width: 880px) {
    .edit {
      font-size: 1.2em;
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
