export function setSearchedMeals(state, meals) {
  state.searchedMeals = meals || []
}

export function setMealsByLetter(state, meals) {
  state.mealsByLetter = meals || []
}

export function setMealsByIngredient(state, meals) {
  state.mealsByIngredient = meals || []
}

export function toggleFavorite(state, meal) {
  const index = state.favorites.findIndex(fav => fav.idMeal === meal.idMeal)
  if (index >= 0) {
    state.favorites.splice(index, 1) // remove
  } else {
    state.favorites.push(meal) // add
  }
}
