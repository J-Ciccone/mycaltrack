import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Paper from "@mui/material/Paper";
import { FoodTableContext } from "../../Context/FoodTableContext";
import { useContext } from "react";
import Button from "@mui/material/Button";

const TrackedFoodList = () => {
  const context = useContext(FoodTableContext);
  const trackedFoodItems = context.foodListForTracking;

  const popTrackedFood = (food) => {
    const foodId = food.id
    context.setFoodListForTracking(context.foodListForTracking.filter(food => food.id !== foodId ));

  };

  return (
    <Paper>
      {trackedFoodItems.map((foodItem) => {
        console.log()
        const controls = foodItem.id + "-content";
        const id = foodItem.id + "-header";
        return (
          <Accordion key={foodItem.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={controls}
              id={id}
            >
              <Typography>{foodItem.description}</Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography>
                Calories: {foodItem.calories} | Fat: {foodItem.fat} | Carbs:{" "}
                {foodItem.carbs} | Protein: {foodItem.protein}
              </Typography>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="small"
                sx={{color:"white"}}
                onClick={()=>{popTrackedFood(foodItem)}}
              >
                Remove
              </Button>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Paper>
  );
};

export default TrackedFoodList;
