<template> 
  <Recipe-detail :is-edit='true'></Recipe-detail>
</template>
<script>
  import RecipeDetail from './components/RecipeDetail'
  export default {
    name: 'updateRecipe',
    components: { RecipeDetail }
  }
</script>
<style>
</style>


