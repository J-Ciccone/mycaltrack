import FoodSearchBar from "../Components/FoodSearchComponents/FoodSearchBar";
import {Paper, Box, Grid, CssBaseline} from "@mui/material";
import { useState } from "react";
import { getFood } from "../Services/FoodService";
import FoodTracker from "../Components/TrackedFoodComponents/FoodTracker";
import { FoodTableContext } from "../Context/FoodTableContext";
import TrackedFoodList  from "../Components/TrackedFoodComponents/TrackedFoodList";
import FoodListTable from "../Components/FoodSearchComponents/FoodListTable";
import ExerciseTracker from "../Components/FoodSearchComponents/ExerciseTracker";

const FoodSearchForm = () => {
  const [foodQuery, setFoodQuery] = useState("");
  const [foodListForTable, setFoodListForTable] = useState([]);
  const [foodListForTracking, setFoodListForTracking] = useState([]);

  const onFoodSubmitted = (query) => {
    getFood(query).then((result) => {
      return setFoodQuery(result.foods);
    });
  };
  //TODO Exercise amount take away calories
  return (
    <FoodTableContext.Provider
      value={{
        foodListForTracking,
        setFoodListForTracking,
        foodQuery,
        setFoodQuery,
        foodListForTable,
        setFoodListForTable,
      }}
    >
      <Grid
        container
        component="main"
        height= "100vh"
        
        sx={{
          justifyContent: "space-evenly",
          pt:3
        }}
      >
        <CssBaseline />
        <Grid item>
          <Paper sx={{mb:2}}>
            <FoodSearchBar foodSubmittedHandler={onFoodSubmitted} />
          </Paper>
        </Grid>
        <Grid item>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FoodListTable/>
          </Box>
          <Paper
            sx={{
              my: 8,
              display: "flex",
              justifyContent: "space-evenly",
              flexDirection: "column",
            }}
          >
            <FoodTracker />
            <Paper elevation={4}>
              <TrackedFoodList />
            </Paper>
          </Paper>
        </Grid>
      </Grid>
    </FoodTableContext.Provider>
  );
};

export default FoodSearchForm;
