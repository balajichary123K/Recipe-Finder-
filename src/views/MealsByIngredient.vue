<template>
  <div class="p-5">
    <input v-model="ingredient"
      type="text"
      class="rounded border-2 border-gray-200 w-full mb-5"
      placeholder="Search by Ingredient"
      @keyup.enter="searchByIngredient">

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <MealCard v-for="meal in meals" :key="meal.idMeal" :meal="meal" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import store from '@/store'
import MealCard from '@/components/MealCard.vue'

const ingredient = ref('chicken_breast')
const meals = computed(() => store.state.mealsByIngredient)

function searchByIngredient() {
  store.dispatch('searchMealsByIngredient', ingredient.value)
}

onMounted(() => {
  searchByIngredient() // default
})
</script>
