<template>
  <div class="bg-white shadow rounded-xl overflow-hidden">
    <router-link :to="{ name: 'mealDetails', params: { id: meal.idMeal } }">
      <img :src="meal.strMealThumb" :alt="meal.strMeal" class="rounded-t-xl object-cover w-full h-48"/>
    </router-link>
    <div class="p-3">
      <div class="flex justify-between items-center">
        <h3 class="font-bold">{{ meal.strMeal }}</h3>
        <button @click.stop="toggleFavorite(meal)">
          <span v-if="isFavorite(meal)">❤️</span>
          <span v-else>🤍</span>
        </button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { computed } from 'vue'
import store from '@/store'

const props = defineProps({
  meal: { type: Object, required: true }
})

const favorites = computed(() => store.state.favorites)

function toggleFavorite(meal) {
  store.commit('toggleFavorite', meal)
}

function isFavorite(meal) {
  return favorites.value.some(fav => fav.idMeal === meal.idMeal)
}
</script>
