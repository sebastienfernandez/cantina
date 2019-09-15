<template>
  <div class="edit">
    <h1>{{ newTitle }}</h1>
    <form
      id="app"
      @submit="checkForm"
      action="https://vuejs.org/"
      method="post"
      novalidate="true"
    >

  <p v-if="errors.length" class="errorMessage">
    <b>Veuillez corriger les erreurs suivantes :</b>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
  </p>

  <p class="labelInputRow">
    <label for="name">Name</label>
    <input
      id="name"
      v-model="name"
      type="text"
      name="name"
      maxlength="30"
    >
  </p>

  <p class="labelInputRow">
    <label for="description">Description</label>
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
        Difficulté :<br />
        <p><input type="radio" name="difficulty" value="padawan" id="padawan" checked /> <label for="padawan">Padawan</label></p><br />
        <p><input type="radio" name="difficulty" value="jedi" id="jedi" /> <label for="jedi">Jedi</label></p><br />
        <p><input type="radio" name="difficulty" value="master" id="master" /> <label for="master">Maître</label></p><br />
    </span>

    <p class="inputsTime">
      <label for="time">Durée (en minutes) :</label>
      <input type="range" min="0" max="200" v-model="timeValue" step="1" id="timeValue" name="timeValue" />
      <input type="number" v-model="timeValue"/>
    </p>
  </div>

   <p class="inputsPersons">
     <label for="persons">Pour combien de personnes ?</label>
     <input type="number" id="persons" name="persons" v-model="persons" min="1" max="8" step="1" />
   </p>

  <div>
    <p class="titleAdd">
     <b>Ajouter un ingrédient</b>
     <a-icon type="plus-circle" class="buttonAdd" />
    </p>
    <ul>
      <li v-for="ingrediant in ingrediantList">{{ ingrediant }}</li>
    </ul>
  <div>

    </div>
  </div>
  <div>
    <p class="titleAdd">
     <b>Etapes de la recette : </b>
     <a-icon type="plus-circle" class="buttonAdd" />
    </p>
    <ul>
      <li v-for="step in stepList">{{ step }}</li>
    </ul>
  <div>

    </div>
  </div>

  <div class="editFooter">
    <p class="imgRecipe">
      <label for="srcImg">Source de votre photo de recette</label>
      <input type="url" placeholder="http://..." name="srcImg" id="srcImg" v-model="srcImg"/>
      <img v-bind:src="srcImg" alt="photo recette geek">
    </p>
    <div class="buttonsFooter">
      <button class="buttonFooter">Reset</button>
      <input type="submit" value="Submit" class="buttonFooter" >
    </div>
  </div>

</form>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  

  @Component({})

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
    }


    
    
  }

</script>

<style>
  .edit {
    margin: 0 auto;
    width: 90%;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
  }

  .errorMessage {
    margin: 0 auto;
    margin-bottom: 5%;
  }

  .labelInputRow {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 4%;
  }

  .labelInputRow label {
    margin-right: 30px;
  }

  .labelInputRow input {
    margin-right: 30px;
  }

  .diffAndTime {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 500px;
  }

  .difficutySelect {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    height: 200px;
    width: 200px;
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
    align-items: center;
  }
  
  .inputsPersons input {
    margin-left: 30px;
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
    width: 500px;
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

  @media screen and (max-width: 600px) {
    .edit {
      width: 100%;
    }

    .diffAndTime {
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
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
