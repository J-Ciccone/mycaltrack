import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { getFood } from "../../Services/FoodService";
import Typography from "@mui/material/Typography";
import { useState, useContext } from "react";
import { FoodTableContext } from "../../Context/FoodTableContext";
import SetMealIcon from '@mui/icons-material/SetMeal';

const FoodSearchBar = () => {
  const [foodQuery, setFoodQuery] = useState("");
  const context = useContext(FoodTableContext)

  const submitHandler = (event) => {
    event.preventDefault();
    getFood(foodQuery).then((result) => {
      return context.setFoodListForTable(result.foods);
    });
  };

  const textChangeHandler = (event) => {
    setFoodQuery(event.target.value);
  };

  return (
    <Box
      sx={{
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
    </Box>
  );
};

export default FoodSearchBar;
