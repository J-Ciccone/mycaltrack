import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Paper from "@mui/material/Paper";
import { FoodContext } from "../../Context/Context";
import { useContext } from "react";
import Button from "@mui/material/Button";

const TrackedFoodList = () => {
  const context = useContext(FoodContext);
  const trackedFoodItems = context.foodListForTracking;

  const popTrackedFood = (food) => {
    const foodId = food.key
    context.setFoodListForTracking(context.foodListForTracking.filter(food => food.key !== foodId ));

  };

  return (
    <>
      {trackedFoodItems.map((foodItem) => {
        const controls = foodItem.key + "-content";
        const id = foodItem.key + "-header";

        return (
          <Accordion key={foodItem.key}>
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
                Calories: {foodItem.calories} kcals | Fat: {foodItem.fatFormat} | Carbs:
                {foodItem.carbsFormat} | Protein: {foodItem.proteinFormat}
              </Typography>
              <Button
                type="submit"
                color="secondary"
                size="small"
                sx={{color:"secondary"}}
                onClick={()=>{popTrackedFood(foodItem)}}
              >
                Remove
              </Button>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
};

export default TrackedFoodList;
