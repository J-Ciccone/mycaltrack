import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { Box, Grid, Link, Select, MenuItem, InputLabel } from "@mui/material";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { MyFireStore } from "../../FireBaseValues";
import { doc, setDoc } from "firebase/firestore";
import * as exService from "../../Services/ExerciseService";

import { useState, useContext } from "react";
import { UserContext } from "../../Context/Context";

const Signup = () => {
  const [units, setUnits] = useState("lbs");
  const [gender, setGender] = useState("male");

  const handleChangeUnit = (event) => {
    setUnits(event.target.value);
  };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const auth = getAuth();

    const data = new FormData(event.currentTarget);

    const email = data.get("email");
    const password =
      data.get("password") === data.get("confirm-password") &&
      data.get("password");

    const age = data.get("age");
    const uName = data.get("username");
    const weightNumber = data.get("weight");
    const weightUnits = units;
    const heightFeet = data.get("height");
    const heightInches = data.get("inches");
    const gender_ = gender;
    const BMR_ = exService.calculateBMRSimplified(gender_,weightUnits,heightFeet,heightInches,weightNumber,age)

    if (password !== false) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          return userCredential.user;
          // ...
        })
        .then((user) => {
          setDoc(doc(MyFireStore, "users", user.uid), {
            email: user.email,
            uName: uName,
            heightFeet: heightFeet,
            heightInches: heightInches,
            weightNumber: weightNumber,
            weightUnit: weightUnits,
            gender: gender_,
            age: age,
            BMR: BMR_,
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorCode+' : '+errorMessage)
          // ..
        });
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <Paper>
      <Box
        sx={{
          mx: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box onSubmit={handleSubmit} component="form" sx={{ mt: 1 }}>
          <Box sx={{ mt: 1, width: "50vw" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirm-password"
              label="Confirm Password"
              type="password"
              id="confirm-password"
              autoComplete="confirm-current-password"
            />
            <TextField
              required
              margin="normal"
              fullWidth
              name="username"
              label="Display Name"
              id="username"
            />
            <TextField
              required
              margin="normal"
              fullWidth
              name="age"
              label="Age"
              id="age"
            />
            <InputLabel id="units_">Units</InputLabel>
            <Select
              labelId="units_"
              id="unit_select"
              onChange={handleChangeUnit}
              value={units}
              label="Units"
            >
              <MenuItem value={"lbs"}>Imperial</MenuItem>
              <MenuItem value={"kgs"}>Metric</MenuItem>
            </Select>
            {units === "kgs" && (
              <>
                <TextField
                  required
                  margin="normal"
                  fullWidth
                  name="weight"
                  label="Weight (kgs)"
                  id="weight"
                />
                <TextField
                  required
                  margin="normal"
                  fullWidth
                  name="height"
                  label="Height (cm)"
                  id="height"
                />
              </>
            )}
            {units === "lbs" && (
              <>
                <TextField
                  required
                  margin="normal"
                  fullWidth
                  name="weight"
                  label="Weight (lbs)"
                  id="weight"
                />
                <TextField
                  required
                  margin="normal"
                  fullWidth
                  name="height"
                  label="Height (ft)"
                  id="Height"
                />
                <TextField
                  required
                  margin="normal"
                  fullWidth
                  name="inches"
                  label="Inches"
                  id="inches"
                />
              </>
            )}

            <InputLabel id="gender_">Gender</InputLabel>
            <Select
              labelId="gender_"
              id="gender_select"
              onChange={handleChangeGender}
              value={gender}
              label="Gender"
            >
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
            </Select>
          </Box>
          <Typography variant="subtitle2" sx={{ mt: 2 }}>
            Information provided is used to calculate your Base Metabolic Rate
            (BMR)
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ my: 3, mr: 5 }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Typography>
                <NavLink
                  style={{ textDecoration: "none", color: "#609BC5" }}
                  to="/login"
                >
                  Already have an account? Log in.
                </NavLink>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
};

export default Signup;
