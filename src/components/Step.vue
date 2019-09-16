<template>
    <div class="stepInterface">
        <textarea name="step" rows="3" cols="45">

        </textarea>
        <a-icon type="close-square" v-on:click="deleteStep" />
    </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';
@Component

export default class Step extends Vue {

    deleteStep() : void {

    }

}


</script>

<style>

</style>