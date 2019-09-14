<template>
    <div id="recipe">
        <header>
            <a-icon type="edit" />
            <a-icon type="delete" />
        </header>
        <main>
            <section class="contentRecipeTop">
                <aside>
                    <img src="../assets/logo-vue.png" alt="photo recette geek">
                </aside>
                <div>
                    <article>
                        <h1>Titre de la recette</h1>
                        <p>Pour {{ numberOfPersons }}</p>
                        <p>Nécessite {{ timeOfCook }}</p>
                        <p>Niveau {{ difficulty }}</p>
                    </article>
                    <article>
                        <h2>Description complète de la recette : </h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Nulla sed lacinia odio. Interdum et malesuada fames ac ante ipsum primis 
                            in faucibus. Duis vulputate, nulla nec eleifend pulvinar, sapien sapien 
                            facilisis lacus, at eleifend justo ipsum non justo. Mauris pharetra eleifend 
                            libero vel hendrerit. Aenean vehicula lacus nec sodales iaculis. Donec blandit 
                            consequat ex congue finibus. Morbi magna urna, ultricies non ornare ut, 
                            congue eget dolor. Nunc varius dapibus tellus, quis scelerisque elit. 
                            Nunc auctor massa quis suscipit lobortis.
                        </p>
                    </article>
                </div>
            </section>
            <section class="contentRecipeBottom">
                <div>
                    <h3>Liste des ingrédients magiques :</h3>
                    <ul>
                        
                    </ul>
                </div>
                <div>
                    <a-collapse defaultActiveKey="1" :bordered="false">
                        <a-collapse-panel v-bind:header="headerStep" key="1" class="stepStyle">
                            <p>{{textStep}}</p>
                        </a-collapse-panel>
                        <a-collapse-panel v-bind:header="headerStep" key="2" class="stepStyle">
                            <p>{{textStep}}</p>
                        </a-collapse-panel>
                        <a-collapse-panel v-bind:header="headerStep" key="3" class="stepStyle">
                            <p>{{textStep}}</p>
                        </a-collapse-panel>
                    </a-collapse>
                </div>
            </section>
        </main>
        <footer>

        </footer>
    </div>
</template>

<script lang="ts">

    import { Component, Vue } from 'vue-property-decorator';

    export default class Recipe extends Vue {
        number: number = 2;
        numberOfPersons: string = `${this.number} personnes`
        timeOfCook: string = '30min.'
        difficulty: string = 'padawan'
        headerStep: string = 'Ceci est l\'étape numéro '
        textStep: string = 
            'Ceci est une étape parmi toutes les autres étapes. Elles sont donc à suivre méticuleusement'
    }

</script>

<style>
    .stepStyle {
        background-color: #f7f7f7;
        border-radius: 5px;
        margin-bottom: 2%;
        border: 0;
        overflow: hidden;
    }
</style>