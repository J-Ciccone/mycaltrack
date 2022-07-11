import { Typography, Paper, Box, Grid, CssBaseline } from "@mui/material";

const LoadingScreen = () => {
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
    <Paper>
      <Box
        sx={{
          mx: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography>Loading...</Typography>
      </Box>
    </Paper>
    </Grid>
  );
};

export default LoadingScreen;
