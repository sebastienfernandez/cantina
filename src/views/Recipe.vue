<template>
    <div id="recipe">
        <header>

            <!-- Icônes de modification et de supression de la recette -->

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
                    <!-- photo de la recette -->
                    <img 
                        v-bind:src="this.infosRecipe.photo" 
                        alt="photo recette geek"
                        width="320px"
                        height="380px"
                    >
                </aside>
                <div class="mainContentRecipeTop">
                    <article class="informationRecipe">
                        <h1>{{ this.infosRecipe.titre }}</h1>
                        <p> <!-- met personne au singulier ou pluriel -->
                            Pour {{this.infosRecipe.personnes}}
                            <span v-if="this.infosRecipe.personnes === 0 || this.infosRecipe.personnes === 1">personne</span>
                            <span v-else>personnes</span>
                        </p>
                        <p>Nécessite 
                            <!-- affiche le temps en minutes avec les heures -->
                            <span v-if="this.infosRecipe.tempsPreparation > 60">{{Math.trunc(this.infosRecipe.tempsPreparation/60)}}h</span>
                            {{this.infosRecipe.tempsPreparation%60}}
                            <span v-if="((this.infosRecipe.tempsPreparation%60) === 0) || ((this.infosRecipe.tempsPreparation%60) === 1)">minute</span>
                            <span v-else>minutes</span>
                        </p>
                        <p>Niveau {{this.infosRecipe.niveau}}</p>
                    </article>
                    <article class="description">
                        <h2>Description complète de la recette : </h2>
                        <p class="textDescription">
                            {{this.infosRecipe.description}}
                        </p>
                    </article>
                </div>
            </section>
            <section class="contentRecipeBottom">
                <div class="ingrediantsContainer">
                    <h3>Liste des ingrédients magiques :</h3>

                    <!-- suite des ingrdients de la recette -->

                    <ul>
                        <li v-for="ingredient in this.infosRecipe.ingredients">
                            {{ingredient[0] }} {{ingredient[1]}}
                        </li>
                    </ul>
                </div>
                <div class="stepsContainer">
                    <h3>Liste des étapes :</h3>
                    <!-- liste des etapes de la recette  -->
                    <a-collapse defaultActiveKey="1" :bordered="false">
                        <a-collapse-panel 
                            v-for="(etape, index) in this.infosRecipe.etapes"
                            v-bind:key="index"
                            v-bind:header="headerStep + (index+1)"
                            class="stepStyle">
                            <p>{{etape}}</p>
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
    import axios from 'axios'

    @Component({})

    export default class Recipe extends Vue {

        headerStep: any = 'Ceci est l\'étape numéro '
        infosRecipe: any = []
        
        /** requete de supression de la recette */

        confirm() :void {
            console.log('confirmation supression')
            axios
                .delete(`http://localhost:9000/api/recipe/${this.$route.params.id}`)
                .then(response => (alert('recette supprimée')))
                .catch(error => (alert("aucune recette trouvée")))
                history.back()
        }

        cancel() : void {
            console.log('cancel')
        }

        /** appel de la recette au serveur afin d'afficher ses informations */

        mounted() {
            axios
                .get(`http://localhost:9000/api/recipe/${this.$route.params.id}`)
                .then(response => (this.infosRecipe = response.data, console.log(this.infosRecipe)))
                .catch(error => {
                    alert("errorMessage : Recette non trouvée" )
                })
            
        }
        
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
        align-items: center;
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

    /****************** MEDIA QUERIES *****************/

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

    /************** MEDIA QUERIES ******************/

    @media screen and (max-width: 600px) {
        header {
            justify-content: space-around;
        }

        .mainContentRecipeTop {
        display: flex;
        flex-direction: column;
        align-items: center;
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