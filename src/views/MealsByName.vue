<template>
  <div class="p-5">
    <input v-model="keyword"
      type="text"
      class="rounded border-2 border-gray-200 w-full mb-5"
      placeholder="Search for Meals"
      @keyup.enter="searchMeals">

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
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
const route = useRoute()

function searchMeals() {
  store.dispatch('searchMeals', keyword.value || 'Arrabiata') // default meals
}

onMounted(() => {
  keyword.value = route.params.name || 'Arrabiata'
  searchMeals()
})
</script>
