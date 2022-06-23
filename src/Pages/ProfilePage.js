import { Grid, CssBaseline } from "@mui/material";
import ProfileDetails from "../Components/ProfileDetails"

const TrackedProfile = () => {
  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        pt: 3,
      }}
    >
      <CssBaseline />
      <ProfileDetails />
    </Grid>
  );
};

export default TrackedProfile;
