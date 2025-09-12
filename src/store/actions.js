import axiosClient from '@/axiosClient'

export async function searchMeals({commit}, keyword) {
  commit('setLoading', true)
  try {
    const {data} = await axiosClient.get(`search.php?s=${keyword}`)
    commit('setSearchedMeals', data.meals)
  } finally {
    commit('setLoading', false)
  }
}

export async function searchMealsByLetter({commit}, letter) {
  commit('setLoading', true)
  try {
    const {data} = await axiosClient.get(`search.php?f=${letter}`)
    commit('setMealsByLetter', data.meals)
  } finally {
    commit('setLoading', false)
  }
}

export async function searchMealsByIngredient({commit}, ingredient) {
  commit('setLoading', true)
  try {
    const {data} = await axiosClient.get(`filter.php?i=${ingredient}`)
    commit('setMealsByIngredient', data.meals)
  } finally {
    commit('setLoading', false)
  }
}
