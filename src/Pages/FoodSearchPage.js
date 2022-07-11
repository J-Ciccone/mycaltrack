import FoodSearchBar from "../Components/FoodSearchComponents/FoodSearchBar";
import { Paper, Grid, CssBaseline } from "@mui/material";
import { useState } from "react";
import { getFood } from "../Services/FoodService";
import FoodTracker from "../Components/TrackedFoodComponents/FoodTracker";
import { FoodContext } from "../Context/Context";
import TrackedFoodList from "../Components/TrackedFoodComponents/TrackedFoodList";
import FoodListTable from "../Components/FoodSearchComponents/FoodSearchTable";

const FoodSearchForm = () => {
  const [foodQuery, setFoodQuery] = useState("");
  const [foodListForTable, setFoodListForTable] = useState([]);
  const [foodListForTracking, setFoodListForTracking] = useState([]);

  return (
    <FoodContext.Provider
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
        sx={{
          
          justifyContent: "space-evenly",
          pt: 3,
        }}
      >
        <CssBaseline />
        <Grid item md={3} sm={11} mx={3}>
          <FoodSearchBar/>
        </Grid>
        <Grid
          item
          xs={11}
          md={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FoodListTable />

          <Paper
            sx={{
              width:"100%",
              mx: 3,
              my: 4,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <FoodTracker />

            <TrackedFoodList />
          </Paper>
        </Grid>
      </Grid>
    </FoodContext.Provider>
  );
};

export default FoodSearchForm;
