<template> 
  <Recipe-Content-detail :is-edit='false'></Recipe-Content-detail>
</template>
<script>
  import RecipeContentDetail from './components/RecipeContentDetail'
  export default {
    name: 'addRecipeContent',
    components: { RecipeContentDetail }
  }
</script>
<style>
</style>


