import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {  useContext } from "react";
import Paper from "@mui/material/Paper";
import { FoodTableContext } from "../../Context/FoodTableContext";

const FoodTracker = () => {
  const context = useContext(FoodTableContext);
  let calories = 0;
  let carbs = 0;
  let fat = 0;
  let protein = 0;

  for (let food of context.foodListForTracking) {
    calories += food.calories;
    carbs += food.carbs;
    fat += food.fat;
    protein += food.protein;
  }

  const caloriesSubmitHandler = () => {};

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
          onClick={caloriesSubmitHandler}
        >
          Save
        </Button>
      </Paper>
    </Box>
  );
};

export default FoodTracker;
