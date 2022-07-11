import { API_KEY } from "../Values";

//API call for retrieving food search results
export const getFood = (foodName) => {
  return fetch(
    "https://api.nal.usda.gov/fdc/v1/foods/search?query=" +
      foodName +
      "&pageSize=50&api_key=" +
      API_KEY
  ).then((res) => {
    return res.json();
  });
};

//helper function to get nutrient info from search results
const getFoodNutrients = (foodNutrientArray) => {
  const nutrientCodes = [1003, 1004, 1005, 1008];
  let foundNutrientObject = {
    calories: "",
    protein: "",
    fat: "",
    carbs: "",
  };
  nutrientCodes.forEach((code) => {
    for (let nut of foodNutrientArray) {
      if (nut.nutrientId === code) {
        code === 1003 && (foundNutrientObject.protein = nut.value);
        code === 1004 && (foundNutrientObject.fat = nut.value);
        code === 1005 && (foundNutrientObject.carbs = nut.value);
        code === 1008 && (foundNutrientObject.calories = nut.value);
      }
    }
  });
  return foundNutrientObject;
};

//creates food objects for tracking 
export const createFoodObjectsForTable = (foods) => {
  const foodArrayCurrent = [...foods];
  const foodArrayFormatted = [];
  for (let food of foodArrayCurrent) {
    let nutrients = getFoodNutrients(food.foodNutrients);
    let newFoodObject = {
      id: food.fdcId,
      key: food.fdcId+((Math.floor(Math.random() * 10000))),
      description: food.description,
      brand: food.brandOwner,
      category: food.foodCategory,
      calories: nutrients.calories,
      protein: nutrients.protein,
      fat: nutrients.fat,
      carbs: nutrients.carbs,
      caloriesFormat: nutrients.calories + " cal",
      proteinFormat: nutrients.protein + " g",
      fatFormat: nutrients.fat + " g",
      carbsFormat: nutrients.carbs + " g",
    };
    foodArrayFormatted.push(newFoodObject);
  }
  return foodArrayFormatted;
};
