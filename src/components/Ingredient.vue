<template>
    <div class="ingredientInterface">
        <input name="qty" type="number" min="1" max="1000"/>
        <select name="mesure" id="mesure">
            <option value="cl">cl</option>
            <option value="mg">mg</option>
            <option value="g">g</option>
            <option value=" "> </option>
        </select>
        <input name="ingredient" type="text" maxlength="30"/>
        <a-icon type="close-square" v-on:click="deleteIngredient" class="closeButton" />
    </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';

@Component

export default class Ingredient extends Vue {

    deleteIngredient() : void {

    }

}

</script>

<style>
    .closeButton {
        font-size: 20px;
    }
</style>