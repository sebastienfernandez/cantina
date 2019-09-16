<template>
    <div id="recipe">
        <header>
            <router-link to="/edit">
                <a-icon type="edit" class="iconHeaderRecipe" />
            </router-link>
            <a-popconfirm title="Voulez vous vraiment supprimer cette recette ?" @confirm="confirm" @cancel="cancel" okText="Oui" cancelText="Non">
                <a-icon type="delete" class="iconHeaderRecipe" />
            </a-popconfirm>
        </header>
        <main>
            <section class="contentRecipeTop">
                <aside class="imgContainer">
                    <img src="../assets/logo-vue.png" alt="photo recette geek">
                </aside>
                <div class="mainContentRecipeTop">
                    <article class="informationRecipe">
                        <h1>Titre de la recette</h1>
                        <p>Pour {{ numberOfPersons }}</p>
                        <p>Nécessite {{ timeOfCook }}</p>
                        <p>Niveau {{ difficulty }}</p>
                    </article>
                    <article class="description">
                        <h2>Description complète de la recette : </h2>
                        <p class="textDescription">
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
                <div class="ingrediantsContainer">
                    <h3>Liste des ingrédients magiques :</h3>
                    <ul>
                        
                    </ul>
                </div>
                <div class="stepsContainer">
                    <h3>Liste des étapes :</h3>
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



    header {
        display: flex !important;
        justify-content: flex-end !important;
        align-items: center !important;
        position: fixed !important;
        top: 0;
        width: 100%;
    }

    .iconHeaderRecipe {
        cursor: pointer;
        font-size: 72px;
    }

    .contentRecipeTop {
        display: flex;
        align-items: center;
        margin-top: 5%;
        margin-bottom: 5%;
    }

    .imgContainer {
        width: 32%;
    }

    .mainContentRecipeTop {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 68%;
    }

    .description {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 2%;
        border: solid black 1px;
        border-radius: 15px;
    }

    .textDescription {
        text-align: left;
    }

    .contentRecipeBottom {
        display: flex;
        align-items: flex-start;
        margin-top: 5%;
    }

    .ingrediantsContainer {
        width: 40%;
    }

    .stepsContainer {
        width: 60%;
    }

    .stepStyle {
        background-color: #f7f7f7;
        border-radius: 5px;
        margin-bottom: 2%;
        border: 0;
        overflow: hidden;
    }

    @media screen and (max-width: 1000px) {
        .contentRecipeTop {
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
        }

        .informationRecipe {
            display: flex;
            flex-direction: column;
            margin: 0 auto;
        }

        .contentRecipeBottom {
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
        }
    }

    @media screen and (max-width: 600px) {
        header {
            justify-content: space-around;
        }

        .mainContentRecipeTop {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 85%;
        }

        .ingrediantsContainer {
        width: 80%;
        }

        .stepsContainer {
        width: 90%;
        }

        .imgContainer {
        width: 50%;
        }
    }
</style>