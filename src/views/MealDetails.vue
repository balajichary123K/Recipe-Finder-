<template>
  <div class="p-5">
    <div v-if="meal" class="max-w-4xl mx-auto bg-white shadow rounded-xl p-5">
      <h2 class="text-3xl font-bold mb-3">{{ meal.strMeal }}</h2>
      <img :src="meal.strMealThumb" :alt="meal.strMeal" class="w-full max-h-96 object-cover rounded mb-5"/>

      <!-- Ingredients + Measurements -->
      <h3 class="text-xl font-semibold mb-2">Ingredients</h3>
      <ul class="list-disc pl-6 mb-5">
        <li v-for="(ingredient, index) in ingredients" :key="index">
          {{ ingredient }} - {{ measurements[index] }}
        </li>
      </ul>

      <!-- Instructions -->
      <h3 class="text-xl font-semibold mb-2">Instructions</h3>
      <p class="mb-5 whitespace-pre-line">{{ meal.strInstructions }}</p>

      <!-- YouTube -->
      <div v-if="meal.strYoutube" class="mt-5">
        <a :href="meal.strYoutube" target="_blank"
           class="px-3 py-2 rounded border-2 bg-red-500 border-red-600 hover:bg-red-600 text-white">
          ▶ Watch on YouTube
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axiosClient from '@/axiosClient'

const route = useRoute()
const meal = ref(null)
const ingredients = ref([])
const measurements = ref([])

onMounted(async () => {
  const id = route.params.id
  const { data } = await axiosClient.get(`lookup.php?i=${id}`)
  meal.value = data.meals[0]

  // Extract ingredients + measurements dynamically
  ingredients.value = []
  measurements.value = []
  for (let i = 1; i <= 20; i++) {
    const ing = meal.value[`strIngredient${i}`]
    const meas = meal.value[`strMeasure${i}`]
    if (ing && ing.trim() !== '') {
      ingredients.value.push(ing)
      measurements.value.push(meas || '')
    }
  }
})
</script>
