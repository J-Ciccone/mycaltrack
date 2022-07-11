import {  Grid, CssBaseline } from "@mui/material";
import { getAuth } from "firebase/auth";
import Signup from "../Components/UI/Signup";

const SignupPage = () => {
  const auth = getAuth();

  return (
    <Grid
      container
      component="main"
      sx={{
        justifyContent: "center",
        pt: 3,
        px:1
      }}
    >
      <CssBaseline />
      <Signup />
    </Grid>
  );
};

export default SignupPage;
