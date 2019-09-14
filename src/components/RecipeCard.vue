<template>
    <a-card
        hoverable
        class="recipeCard"
    >
            <img v-bind:src="masterRank" />
            <img
                alt="example"
                src="../assets/logo-vue.png"
                slot="cover"
            />
            <template class="ant-card-actions" slot="actions">
                <a-icon type="edit" />
                <a-popconfirm title="Voulez vous vraiment supprimer cette recette ?" @confirm="confirm" @cancel="cancel" okText="Oui" cancelText="Non">
                    <a-icon type="delete"/>
                </a-popconfirm>
                
            </template>
            <a-card-meta
                title="Titre de la recette"
                description="Ici, la description plutôt courte de la recette"
                class="textRecipeCard"
            >
            </a-card-meta>
        
</a-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

export default class RecipeCard extends Vue {

    masterRank: string = '../assets/master.svg'
    jediRank: string = '../assets/jedi.svg'
    padawanRank: string = '../assets/padawan.svg'

    confirm(e?: any) : void {
        console.log(e)
        alert("La recette '<nom de la recette>' a été supprimée ")
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