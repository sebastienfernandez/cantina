<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <header>
      <h1>{{ title }}</h1>
      <div id="searchBar">

      </div>
    </header>
    <main>

    </main>
    <footer>

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

}

</script>

<style>
  
</style>
