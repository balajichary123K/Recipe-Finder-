<template>
  <div class="p-5">
    <h2 class="text-2xl font-bold mb-5">🍽️ Random Recipes</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <MealCard v-for="meal in meals" :key="meal.idMeal" :meal="meal" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axiosClient from '@/axiosClient'
import MealCard from '@/components/MealCard.vue'

const meals = ref([])

async function loadRandomMeals() {
  meals.value = [] // reset
  const requests = []
  for (let i = 0; i < 9; i++) {   // fetch 9 random recipes
    requests.push(axiosClient.get('random.php'))
  }
  const responses = await Promise.all(requests)
  meals.value = responses.map(res => res.data.meals[0])
}

onMounted(() => {
  loadRandomMeals()
})
</script>
