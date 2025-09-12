<template>
  <div class="p-5">
    <input v-model="keyword"
      type="text"
      class="rounded border-2 border-gray-200 w-full mb-5"
      placeholder="Search for Meals"
      @keyup.enter="searchMeals">

    <!-- Loading state -->
    <div v-if="loading" class="text-center py-5 text-purple-600 font-bold">
      🔄 Loading meals...
    </div>

    <!-- No results -->
    <div v-else-if="meals.length === 0" class="text-center py-5 text-red-600 font-bold">
      ❌ Recipe not found
    </div>

    <!-- Meals -->
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <MealCard v-for="meal in meals" :key="meal.idMeal" :meal="meal" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import store from '@/store'
import { useRoute } from 'vue-router'
import MealCard from '@/components/MealCard.vue'

const keyword = ref('')
const meals = computed(() => store.state.searchedMeals)
const loading = computed(() => store.state.loading)
const route = useRoute()

function searchMeals() {
  store.dispatch('searchMeals', keyword.value || 'Arrabiata')
}

onMounted(() => {
  keyword.value = route.params.name || 'Arrabiata'
  searchMeals()
})
</script>
