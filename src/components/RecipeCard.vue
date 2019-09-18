<template>

    <!-- Router-link qui dirigera vers la page de la recette -->
    <router-link v-bind:to="recipeUrl">
    <a-card
        hoverable
        class="recipeCard"
    >
            <img
                alt="example"
                v-bind:src="photoRecipe"
                slot="cover"
            />
            
            <!-- boutons composants pour supprimer ou modifier la recette  -->

            <template class="ant-card-actions" slot="actions">
                <router-link v-bind:to="editUrl">
                    <a-icon type="edit" />
                </router-link>
                <a-popconfirm 
                    title="Voulez vous vraiment supprimer cette recette ?" 
                    @confirm="confirm" 
                    @cancel="cancel" 
                    okText="Oui" 
                    cancelText="Non"
                >
                    <a-icon type="delete"/>
                </a-popconfirm>
                
            </template>
            <a-card-meta
                v-bind:title="titleRecipe"
                v-bind:description="descriptionRecipe"
                class="textRecipeCard"
            >
            </a-card-meta>

            <!-- respect de l'orthographe  -->
            <div class="textInfoCard">
                <p>Difficulté {{difficultyRecipe}}</p>
                <p>Pour {{personsRecipe}}
                    <span v-if="personsRecipe === 0 || personsRecipe === 1">personne</span>
                    <span v-else>personnes</span>
                </p>
                <p>Nécessite  
                    <span v-if="timeRecipe > 60">{{Math.trunc(timeRecipe/60)}}h</span>
                    {{timeRecipe%60}}
                    <span v-if="((timeRecipe%60) === 0) || ((timeRecipe%60) === 1)">minute</span>
                    <span v-else>minutes</span>
                </p>
            </div>
        
</a-card>
</router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios'

@Component
export default class RecipeCard extends Vue {

    /** props de RecipeCard dont les valeurs sont précisées par le parent, ici Home */

    @Prop() private idRecipe!: number;
    @Prop() private titleRecipe!: string;
    @Prop() private descriptionRecipe!: string;
    @Prop() private photoRecipe!: string;
    @Prop() private difficultyRecipe!: string;
    @Prop() private personsRecipe!: number;
    @Prop() private timeRecipe!: number;
    @Prop() private listRecipes!: any;

    listAfterDelete: any = []

    recipeUrl: string = "/recipe/" + this.idRecipe
    editUrl: string = "/edit/" + this.idRecipe

    /** filtre le tableau de recettes de la recette supprimée */

    confirm(e?: any) : void {
        this.listAfterDelete = this.listRecipes.filter((recipe: any) => {
         if(recipe.id == this.idRecipe) {return false}
         return true
        })
        
        
        if (this.$parent.$data.listChanged = false) {
            this.$parent.$data.listOfRecipes = this.listAfterDelete
        }
        if(this.$parent.$data.listChanged = true) {
            this.$parent.$data.newList = this.listAfterDelete
        }

        /** requête afin de supprimer la recette du serveur */

        axios
                .delete(`http://localhost:9000/api/recipe/${this.idRecipe}`)
                .then(response => (console.log('recette supprimée')))
                .catch(error => (alert("aucune recette trouvée")))
        

    }

}


</script>

<style scoped lang="scss">
    .recipeCard {
        margin: 2%;
        width: 250px;
    }

    .textRecipeCard {
        text-overflow: ellipsis;
        height: 70px;
    }

    .textInfoCard {
        margin-top: 6%;
    }
</style>