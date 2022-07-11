import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import {
  Box,
  Checkbox,
  Avatar,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState, useContext } from "react";
import { UserContext } from "../../Context/Context";
import * as exService from "../../Services/ExerciseService";
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";
import { MyFireStore } from "../../FireBaseValues";
import { doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const ProfileDetails = () => {
  const auth = getAuth();
  const context = useContext(UserContext);
  const userDetails = context.userDetails;
  const [units, setUnits] = useState(userDetails.weightUnit);
  const [exercise, setExercise] = useState("bmr");
  const [calories, setCalories] = useState(userDetails.BMR);
  const [isEditing, setIsEditing] = useState(false);
  
  const docRef = doc(MyFireStore, "users", auth.currentUser.uid);

  const handleProfileSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    //create a new user object
    const updatedUser = {
      age: data.get("age") ? data.get("age") : userDetails.age,
      heightFeet: data.get("height")
        ? data.get("height")
        : userDetails.heightFeet,
      heightInches:
        data.get("inches") !== null || data.get("inches") !== undefined
          ? data.get("inches")
          : userDetails.heightinches,
      uName: data.get("username") ? data.get("username") : userDetails.uName,
      weightNumber: data.get("weight")
        ? data.get("weight")
        : userDetails.weightNumber,
      weightUnit: units,
      BMR: "",
    };

    //calculate BMR based on gender and units
    if (userDetails.gender === "male") {
      console.log(units);
      units === "kgs" &&
        (updatedUser.BMR = exService.calculateMaleBMRMetric(
          updatedUser.heightFeet,
          updatedUser.weightNumber,
          updatedUser.age
        ));

      units === "lbs" &&
        (updatedUser.BMR = exService.calculateMaleBMRImperial(
          updatedUser.heightFeet,
          updatedUser.heightInches,
          updatedUser.weightNumber,
          updatedUser.age
        ));
    } else if (userDetails.gender === "female") {
      units === "kgs" &&
        (updatedUser.BMR = exService.calculateFemaleBMRMetric(
          updatedUser.heightFeet,
          updatedUser.weightNumber,
          updatedUser.age
        ));
      units === "lbs" &&
        (updatedUser.BMR = exService.calculateFemaleBMRImperial(
          updatedUser.heightFeet,
          updatedUser.heightInches,
          updatedUser.weightNumber,
          updatedUser.age
        ));
    }

    //Update the user in firestore
    updateDoc(docRef, updatedUser).then(() => {
      context.setUserDetails({ ...userDetails, ...updatedUser });
      setCalories(updatedUser.BMR);
      setExercise("bmr");
      setIsEditing(false);
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleUnitChange = (event) => {
    setUnits(event.target.value);
  };

  //Used to calculate caloric needs
  const handleExerciseChange = (event) => {
    const value = event.target.value;
    setExercise(value);
    const BMR = userDetails.BMR;
    value === "bmr" && setCalories(BMR);
    value === "sedentary" &&
      setCalories(exService.calculateBMRWithExSedentary(BMR));
    value === "light" && setCalories(exService.calculateBMRWithExLight(BMR));
    value === "moderate" &&
      setCalories(exService.calculateBMRWithExModerate(BMR));
    value === "heavy" && setCalories(exService.calculateBMRWithExVery(BMR));
    value === "extreme" && setCalories(exService.calculateBMRWithExExtra(BMR));
  };

  return (
    <Paper
      sx={{
        px: 5,
        mx: 1,
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isEditing && (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Avatar
              sx={{
                m: 2,
                bgcolor: "secondary.main",
                color: "white",
              }}
            >
              <MonitorHeartOutlinedIcon />
            </Avatar>
            <Box component="form" onSubmit={handleProfileSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                name="username"
                defaultValue={userDetails.uName}
                label="Display Name"
                id="username"
              />
              <TextField
                required
                margin="normal"
                name="age"
                defaultValue={userDetails.age}
                label="Age"
                id="age"
              />

              {units === "kgs" && (
                <>
                  <TextField
                    required
                    margin="normal"
                    name="weight"
                    defaultValue={userDetails.weightNumber}
                    label="Weight (kgs)"
                    id="weight"
                  />
                  <TextField
                    required
                    margin="normal"
                    name="height"
                    defaultValue={userDetails.heightFeet}
                    label="Height (cm)"
                    id="Height"
                  />
                </>
              )}
              {units === "lbs" && (
                <>
                  <TextField
                    required
                    margin="normal"
                    name="weight"
                    defaultValue={userDetails.weightNumber}
                    label="Weight (lbs)"
                    id="weight"
                  />
                  <Box>
                    <TextField
                      required
                      margin="normal"
                      name="height"
                      defaultValue={userDetails.heightFeet}
                      label="Height (ft)"
                      id="Height"
                    />
                    <TextField
                      margin="normal"
                      name="inches"
                      defaultValue={userDetails.heightInches}
                      label="Inches"
                      id="inches"
                    />
                  </Box>
                </>
              )}

              <Typography>
                Base Metabolic Rate: {userDetails.BMR}
                <Box sx={{ display: "inline-block" }}>
                  <Typography variant="subtitle2">kcals</Typography>
                </Box>
              </Typography>

              <InputLabel id="unit_label">Units</InputLabel>
              <Select
                labelId="unit_label"
                id="unit_select"
                defaultValue={userDetails.weightUnits}
                value={units}
                label="Units"
                onChange={handleUnitChange}
              >
                <MenuItem value="lbs">Imperial</MenuItem>
                <MenuItem value="kgs">Metric</MenuItem>
              </Select>

              <Button type="submit" variant="contained" sx={{ my: 3, mx: 5 }}>
                Save
              </Button>
              <Button onClick={handleCancel} sx={{ my: 3, mr: 5 }}>
                Cancel
              </Button>
            </Box>
          </Box>
        )}
        {!isEditing && (
          <>
            <Avatar
              sx={{
                m: 2,
                bgcolor: "secondary.main",
                color: "white",
                
              }}
            ><MonitorHeartOutlinedIcon /></Avatar>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography>{userDetails.uName}</Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography component="div">Age:</Typography>
                <Typography component="div">{userDetails.age}</Typography>
              </Box>
              <Paper
                elevation={5}
                sx={{
                  my: 4,
                  py: 4,
                  px: 2,
                  textAlign: "center",
                }}
              >
                <Typography variant="h4">{calories}</Typography>
                <Typography sx={{ mt: 3, mb: 2 }}>
                  Calories to maintain weight
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Exercise
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={exercise}
                    label="Exercise"
                    onChange={handleExerciseChange}
                  >
                    <MenuItem value={"bmr"}>
                      <Typography>BMR</Typography>
                      <Typography
                        variant="caption"
                        sx={{ m: "auto", p: "auto", fontSize: "50%" }}
                      >
                        Calories you burn without exercise
                      </Typography>
                    </MenuItem>
                    <MenuItem value={"sedentary"}>
                      <Typography>Sedentary</Typography>
                      <Typography
                        variant="caption"
                        sx={{ m: "auto", p: "auto", fontSize: "50%" }}
                      >
                        I rarely exercise
                      </Typography>
                    </MenuItem>
                    <MenuItem value={"light"}>
                      <Typography>Light</Typography>
                      <Typography
                        variant="caption"
                        sx={{ m: "auto", p: "auto", fontSize: "50%" }}
                      >
                        I exercise 1-3 days a week
                      </Typography>
                    </MenuItem>
                    <MenuItem value={"moderate"}>
                      <Typography>Moderate</Typography>
                      <Typography
                        variant="caption"
                        sx={{ m: "auto", p: "auto", fontSize: "50%" }}
                      >
                        I exercise 3-5 days per week
                      </Typography>
                    </MenuItem>
                    <MenuItem value={"heavy"}>
                      <Typography>Heavy</Typography>
                      <Typography
                        variant="caption"
                        sx={{ m: "auto", p: "auto", fontSize: "50%" }}
                      >
                        I exercise 4-7 days per week
                      </Typography>
                    </MenuItem>
                    <MenuItem value={"extreme"}>
                      <Typography>Extreme</Typography>
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography
                          variant="caption"
                          sx={{ m: "auto", p: "auto", fontSize: "50%" }}
                        >
                          Rigorous exercise every day
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ m: "auto", p: "auto", fontSize: "50%" }}
                        >
                          I have physically demanding job
                        </Typography>
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Paper>
            </Box>
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default ProfileDetails;
