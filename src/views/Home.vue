<template>
  <div class="p-5">
    <h2 class="text-2xl font-bold mb-5">🍽️ Random Recipes</h2>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-5 text-purple-600 font-bold">
      🔄 Loading meals...
    </div>

    <!-- Meals Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <MealCard v-for="meal in meals" :key="meal.idMeal" :meal="meal" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axiosClient from '@/axiosClient'
import MealCard from '@/components/MealCard.vue'

const meals = ref([])
const loading = ref(false) // ✅ new

async function loadRandomMeals() {
  loading.value = true
  meals.value = [] // reset before fetching

  try {
    const requests = []
    for (let i = 0; i < 9; i++) {   // fetch 9 random recipes
      requests.push(axiosClient.get('random.php'))
    }
    const responses = await Promise.all(requests)
    meals.value = responses.map(res => res.data.meals[0])
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadRandomMeals()
})
</script>
