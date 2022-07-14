import { Typography, Paper, Button, Box, Snackbar } from "@mui/material";
import { useContext, useState } from "react";
import { FoodContext } from "../../Context/Context";
import { getAuth } from "firebase/auth";
import { ref, set, push } from "firebase/database";
import {  MyRTDS } from "../../FireBaseValues";

const FoodTracker = () => {
  const context = useContext(FoodContext);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  let calories = 0;
  let carbs = 0;
  let fat = 0;
  let protein = 0;

  //Total values for nutrients of the tracked food list 
  for (let food of context.foodListForTracking) {
    calories += food.calories;
    carbs += food.carbs;
    fat += food.fat;
    protein += food.protein;
  }

  //creates a log item for the user's current list of food and posts to the RTDS
  const saveFoodHandler = () => {
    if (context.foodListForTracking.length > 0) {
      const user = getAuth().currentUser;
      const date = new Date();
      for (let food of context.foodListForTracking) {
        if (food.brand === undefined) {
          food.brand = null;
        }
      }

      //create a new log item
      const newUserLogItemObject = {
        id: calories + Math.floor(Math.random() * 10000),
        day: date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + " @" + date.getHours()+":"+date.getMinutes(),
        userCalories: calories,
        userFoods: context.foodListForTracking,
      };

      //get a reference to the user in the RTDS and update
      const dbRef = ref(MyRTDS, "users/" + user.uid);
      const update = push(dbRef);
      set(update, newUserLogItemObject).then(() => {
        context.setFoodListForTracking([]);
        setSnackbarOpen(true);
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography mt={3} component="h2" variant="h5">
        Your Calories for Today...
      </Typography>
      <Paper
        elevation={5}
        sx={{
          my: 4,
          py: 4,
          minWidth: "50%",
          maxWidth: "80%",
          px: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          wordWrap: "break-word",
        }}
      >
        <Box
          sx={{
            textAlign: "right",
          }}
        >
          <Typography component="h2" variant="h4">
            Calories: {calories.toFixed()}
          </Typography>
          <Typography component="h2" variant="h5">
            Fat: {fat.toFixed(1)} g
          </Typography>
          <Typography component="h2" variant="h5">
            Carbs: {carbs.toFixed(1)} g
          </Typography>
          <Typography component="h2" variant="h5">
            Protein: {protein.toFixed(1)} g
          </Typography>
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, color: "white" }}
          color="primary"
          onClick={saveFoodHandler}
        >
          Save
        </Button>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Meals Logged"
      />
    </Box>
  );
};

export default FoodTracker;
