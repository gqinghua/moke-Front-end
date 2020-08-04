<template> 
  <Recipe-detail :is-edit='false'></Recipe-detail>
</template>
<script>
  import RecipeDetail from './components/RecipeDetail'
  export default {
    name: 'addRecipe',
    components: { RecipeDetail }
  }
</script>
<style>
</style>


