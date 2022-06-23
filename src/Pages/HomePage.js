import { Button, Grid, CssBaseline } from "@mui/material";
import { getAuth } from "firebase/auth";


const HomePage = () => {
  const logout = () => {
    const auth = getAuth();
    auth.signOut();
  };

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
      <Button onClick={logout}>Logout</Button>
    </Grid>
  );
};

export default HomePage;
