import { MEALS } from '../../data/dummy-data'
import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/mealsActions'


const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favoritesMeals: []
}


const mealsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAVORITE:
            const existingIndex = state.favoritesMeals.findIndex(favoritesMeal => favoritesMeal.id === action.mealId);
            if (existingIndex >= 0) {
                const updatedMeals = [...state.favoritesMeals];
                updatedMeals.splice(existingIndex, 1);
                return { ...state, favoritesMeals: updatedMeals };
            }
            else {
                const findMeal = state.meals.find(meal => meal.id === action.mealId);
                console.log(findMeal.title, "Redux");
                return { ...state, favoritesMeals: state.favoritesMeals.concat(findMeal) };
            }
        case SET_FILTERS:
            const appliedFilters=action.filters;
            const updatedFilteredMeals = state.meals.filter(meal => {
                if(appliedFilters.gultenFree&&!meal.isGlutenFree)
                {
                    return false;
                }
                if(appliedFilters.lactoseFree&&!meal.isLactosFree)
                {
                    return false;
                }
                if(appliedFilters.vegan&&!meal.isVegan)
                {
                    return false;
                }
                if(appliedFilters.isVegetarian&&!meal.isVegetarian)
                {
                    return false;
                }
                return true;
            });
              return { ...state, filteredMeals: updatedFilteredMeals };

        default:
            return state;
    }

}

export default mealsReducer;