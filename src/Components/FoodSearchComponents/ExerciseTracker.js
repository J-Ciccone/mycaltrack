import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";


const ExerciseTracker = () => {

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography mt={3} component="h2" variant="h5">
        Get Any Exercise?
      </Typography>
      <Paper
        elevation={5}
        sx={{
          my: 4,
          py: 4,
          minWidth: "50%",
          maxWidth: "80%",
          px: 2,
          textAlign: "center",
          wordWrap: "break-word",
        }}
      >
        <Typography component="h2" variant="h2">
          -250
        </Typography>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          color="secondary"
          
        >
          Track Exercise
        </Button>
      </Paper>
    </Box>
  )
};

export default ExerciseTracker;
