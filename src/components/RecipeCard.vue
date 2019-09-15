<template>
    <a-card
        hoverable
        class="recipeCard"
    >
            <img
                alt="example"
                v-bind:src="photoRecipe"
                slot="cover"
            />
            <template class="ant-card-actions" slot="actions">
                <a-icon type="edit" />
                <a-popconfirm title="Voulez vous vraiment supprimer cette recette ?" @confirm="confirm" @cancel="cancel" okText="Oui" cancelText="Non">
                    <a-icon type="delete"/>
                </a-popconfirm>
                
            </template>
            <a-card-meta
                v-bind:title="titleRecipe"
                v-bind:description="descriptionRecipe"
                class="textRecipeCard"
            >
            </a-card-meta>
            <p>difficulté {{difficultyRecipe}}</p>
            <p>Pour {{personsRecipe}}
                <span v-if="personsRecipe === 0">personne</span>
                <span v-else>personnes</span>
            </p>
            <p>Nécessite  
                <span v-if="timeRecipe > 60">{{Math.trunc(timeRecipe/60)}}h</span>
                {{timeRecipe%60}}
                <span v-if="((timeRecipe%60) === 0) || ((timeRecipe%60) === 1)">minute</span>
                <span v-else>minutes</span>
            </p>
        
</a-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class RecipeCard extends Vue {

    @Prop() private idRecipe!: number;
    @Prop() private titleRecipe!: string;
    @Prop() private descriptionRecipe!: string;
    @Prop() private photoRecipe!: string;
    @Prop() private difficultyRecipe!: string;
    @Prop() private personsRecipe!: number;
    @Prop() private timeRecipe!: number;

    confirm(e?: any) : void {
        console.log(e)
        alert("La recette " + this.titleRecipe + " a été supprimée ")
    }

    cancel(e?: any) : void {
        console.log(e)
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
</style>