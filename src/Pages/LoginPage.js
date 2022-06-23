import { Grid, CssBaseline } from "@mui/material";
import { getAuth } from "firebase/auth";
import Login from "../Components/UI/Login";

const LoginPage = () => {
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
      <Login />
    </Grid>
  );
};

export default LoginPage;
