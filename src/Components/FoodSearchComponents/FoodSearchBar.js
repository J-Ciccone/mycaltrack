import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper"
import { getFood } from "../../Services/FoodService";
import Typography from "@mui/material/Typography";
import { useState, useContext } from "react";
import { FoodContext } from "../../Context/Context";
import SetMealIcon from '@mui/icons-material/SetMeal';

const FoodSearchBar = () => {
  const [foodQuery, setFoodQuery] = useState("");
  const context = useContext(FoodContext)

  const submitHandler = (event) => {
    event.preventDefault();
    //make the api call to get food results, set the results for the food search table
    getFood(foodQuery).then((result) => {
      return context.setFoodListForTable(result.foods);
    })
  };

  const textChangeHandler = (event) => {
    setFoodQuery(event.target.value);
  };

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb:2,
        px:{md:2, xs:3},
        mx:-1
      }}
    >
      <Avatar sx={{ m: 2, bgcolor: "secondary.main", color: "white" }} ><SetMealIcon></SetMealIcon></Avatar>
      <Typography component="h1" variant="h5">
        What did you eat today?
      </Typography>
      <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="foodSearch"
          label="Enter Food Name"
          name="foodSearch"
          autoFocus
          onChange={textChangeHandler}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, color: "white" }}
          color="primary"
        >
          Search
        </Button>
      </Box>
    </Paper>
  );
};

export default FoodSearchBar;
