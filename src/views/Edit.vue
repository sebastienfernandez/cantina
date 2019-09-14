<template>
  <div class="edit">
    <h1>{{ newTitle }}</h1>
    <form
  id="app"
  @submit="checkForm"
  action="https://vuejs.org/"
  method="post"
>

  <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
  </p>

  <p>
    <label for="name">Name</label>
    <input
      id="name"
      v-model="name"
      type="text"
      name="name"
    >
  </p>

  <p>
    <label for="description">Description</label>
    <textarea name="description" id="description" cols="30" rows="10"></textarea>
  </p>

  <p>
       Difficulté :<br />
       <input type="radio" name="difficulty" value="padawan" id="padawan" /> <label for="padawan">Padawan</label><br />
       <input type="radio" name="difficulty" value="jedi" id="jedi" /> <label for="jedi">Jedi</label><br />
       <input type="radio" name="difficulty" value="master" id="master" /> <label for="master">Maître</label><br />
   </p>

   <p>
     <label for="time">Durée (en minutes)</label>
     <input type="range" min="0" max="200" v-model="value" step="1" id="time" name="time" />
     <input type="number" v-model="value"/>
   </p>

   <p>
     <label for="persons">Pour combien de personnes ?</label>
     <input type="number" id="persons" name="persons" v-model="persons" min="1" max="8" step="1" />
   </p>

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

</style>
