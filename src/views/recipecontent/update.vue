<template> 
  <Recipe-Content-detail :is-edit='true'></Recipe-Content-detail>
</template>
<script>
  import RecipeContentDetail from './components/RecipeContentDetail'
  export default {
    name: 'updateRecipeContent',
    components: { RecipeContentDetail }
  }
</script>
<style>
</style>


