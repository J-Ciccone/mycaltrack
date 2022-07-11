import { Grid, CssBaseline, Paper } from "@mui/material";
import ProfileDetails from "../Components/ProfileComponents/ProfileDetails";
import FoodLog from "../Components/ProfileComponents/FoodLog";

const TrackedProfile = () => {
  return (
    <Grid
      container
      component="main"
      sx={{
        pt: 3,
        justifyContent: "space-evenly",
      }}
    >
      <CssBaseline />
      <Grid item xs={12} md={4}>
        <ProfileDetails />
      </Grid>

      <Grid item xs={12} md={8} sx={{}}>
        <FoodLog />
      </Grid>
    </Grid>
  );
};

export default TrackedProfile;
