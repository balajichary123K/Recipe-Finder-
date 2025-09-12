<template>
  <div class="p-5">
    <div class="flex gap-2 flex-wrap mb-5">
      <button v-for="letter in letters" :key="letter"
        class="px-2 py-1 border rounded hover:bg-purple-200"
        @click="searchByLetter(letter)">
        {{ letter }}
      </button>
    </div>
    <div v-if="loading" class="text-center py-5 text-purple-600 font-bold">
  🔄  Loading meals...
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <MealCard v-for="meal in meals" :key="meal.idMeal" :meal="meal" />
    </div>

  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import store from '@/store'
import MealCard from '@/components/MealCard.vue'

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const meals = computed(() => store.state.mealsByLetter)

function searchByLetter(letter) {
  store.dispatch('searchMealsByLetter', letter)
}

onMounted(() => {
  // default random meals (use letter A by default)
  searchByLetter('a')
})
</script>
