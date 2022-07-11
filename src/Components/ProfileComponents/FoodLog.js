import { getAuth } from "firebase/auth";
import { MyRTDS } from "../../FireBaseValues";
import { useState } from "react";
import { ref, child, get,  } from "firebase/database";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Typography,
  Divider,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
} from "@mui/material";

const FoodLog = () => {
  const [foodLog, setFoodLog] = useState();
  const [gotLog, setGotLog] = useState(false);
  const user = getAuth().currentUser;
  const dbRef = ref(MyRTDS);

  //check if we have already fetched the user's log, if not fetch the log from the RTDS
  if (!gotLog) {
    get(child(dbRef, "users/" + user.uid))
      .then((snapshot) => {
        const logItems = [];
        if (snapshot.exists()) {
          const snapshotObject = snapshot.val();
          for (let item in snapshotObject) {
            logItems.push(snapshotObject[item]);
          }
          setFoodLog(logItems);
          setGotLog(true);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <Paper
      sx={{
        mx: 1,
        mb: 2,
        height: "auto",
        maxHeight: "80vh",
        overflow: "auto",
      }}
    >
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        Log
      </Typography>
      <Divider />
      {gotLog &&
        foodLog.map((logItem, index) => {
          const logItemFood = logItem.userFoods;
          const controls = logItem.id + "-content";
          const id = logItem.id + "-header";
          return (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={controls}
                id={id}
              >
                <Typography sx={{ flexGrow: 1 }}>{logItem.day}</Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ flexGrow: 2, display: "inline" }}
                >
                  I consumed{" "}
                  <Box display={"inline-block"}>{logItem.userCalories}</Box>{" "}
                  calories
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{}}>
                {gotLog &&
                  logItemFood.map((food, index) => {
                    return (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", md: "row" },
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="h6">{food.description}</Typography>

                        <Typography ml={1}>
                          Calories: {food.calories} kcals | Fat:{" "}
                          {food.fatFormat} | Carbs: {food.carbsFormat} |
                          Protein: {food.proteinFormat}
                        </Typography>
                      </Box>
                    );
                  })}
              </AccordionDetails>
            </Accordion>
          );
        })}
      {!gotLog && (
        <Typography sx={{ textAlign: "center", mt: 3, pb: 3 }}>
          This is your food log. Try going to the tracker page and adding some
          food!
        </Typography>
      )}
    </Paper>
  );
};

export default FoodLog;
