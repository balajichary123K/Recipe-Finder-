<template>
  <div class="p-5">
    <h2 class="text-xl font-bold mb-5">Favorite Meals ❤️</h2>
    <div v-if="favorites.length === 0">No favorites yet.</div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div v-for="meal in favorites" :key="meal.idMeal"
           class="bg-white shadow rounded-xl overflow-hidden">
        <!-- ✅ Clickable meal (go to details) -->
        <router-link :to="{ name: 'mealDetails', params: { id: meal.idMeal } }">
          <img :src="meal.strMealThumb" :alt="meal.strMeal"
               class="w-full h-48 object-cover"/>
        </router-link>
        <div class="p-3 flex justify-between items-center">
          <h3 class="font-bold">{{ meal.strMeal }}</h3>
          <router-link
            :to="{ name: 'mealDetails', params: { id: meal.idMeal } }"
            class="text-sm text-purple-600 hover:underline">
            View Details
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import store from '@/store'

const favorites = computed(() => store.state.favorites)
</script>
