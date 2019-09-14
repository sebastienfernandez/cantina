<template>
  <div class="edit">
    <h1>{{ newTitle }}</h1>
    <form
      id="app"
      @submit="checkForm"
      action="https://vuejs.org/"
      method="post"
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
    >
  </p>

  <p class="labelInputRow">
    <label for="description">Description</label>
    <textarea name="description" id="description" cols="50" rows="5"></textarea>
  </p>


  <div class="diffAndTime">
    <span class="difficutySelect">
        Difficulté :<br />
        <p><input type="radio" name="difficulty" value="padawan" id="padawan" /> <label for="padawan">Padawan</label></p><br />
        <p><input type="radio" name="difficulty" value="jedi" id="jedi" /> <label for="jedi">Jedi</label></p><br />
        <p><input type="radio" name="difficulty" value="master" id="master" /> <label for="master">Maître</label></p><br />
    </span>

    <p class="inputsTime">
      <label for="time">Durée (en minutes)</label>
      <input type="range" min="0" max="200" v-model="value" step="1" id="time" name="time" />
      <input type="number" v-model="value"/>
    </p>
  </div>

   <p class="labelInputRow">
     <label for="persons">Pour combien de personnes ?</label>
     <input type="number" id="persons" name="persons" v-model="persons" min="1" max="8" step="1" />
   </p>

  <div>
    <p class="titleAdd">
     <b>Ajouter un ingrédient</b>
     <a-icon type="plus-circle" class="buttonAdd" />
    </p>
  </div>
  <div>
    <p class="titleAdd">
     <b>Etapes de la recette : </b>
     <a-icon type="plus-circle" class="buttonAdd" />
    </p>
  </div>

  <p>
    <input
      type="submit"
      value="Submit"
    >
  </p>

</form>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({})

  export default class Edit extends Vue {

    newTitle: string = 'Nouvelle recette'

    editTitle: string = 'Modification de la recette'

    errors: string[] =['error 1', 'error 2', 'error 3']

    name: string = ' '
    value: number = 100
    persons: number = 2

    checkForm(e?: any) : any {
      if (this.name) {
        return true
      }

      this.errors = [];

      if (!this.name) {
        this.errors.push('Name required.');
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

  .difficutySelect {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .difficutySelect input {
    margin: 8px;
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
</style>
