import {  Grid, CssBaseline } from "@mui/material";
import { getAuth } from "firebase/auth";
import ForgotPassword from "../Components/UI/ForgotPassword";

const ForgotPasswordPage = () => {
  const auth = getAuth();

  return (
    <Grid
      container
      component="main"
      sx={{
        justifyContent: "center",
        pt: 3,
      }}
    >
      <CssBaseline />
      <ForgotPassword />
    </Grid>
  );
};

export default ForgotPasswordPage;
