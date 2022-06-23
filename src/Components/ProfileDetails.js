import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { Box, Checkbox } from "@mui/material";
import Typography from "@mui/material/Typography";

const ProfileDetails = () => {

  const x = true;

  const handleProfileSubmit = (event) => {
    event.preventDefault();
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
        <Typography component="h1" variant="h5" sx={{ mt: 1 }}>
          Your Profile
        </Typography>
        <Box
          contentEditable="false"
          component="form"
          onSubmit={handleProfileSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField margin="normal" fullWidth id="age" name="age" />
          <TextField
            margin="normal"
            required
            fullWidth
            name="height"
            label="height"
            id="height"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="weight"
            label="weight"
            id="weight"
          />
          <Checkbox value="remember" color="primary" />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ my: 3, mr: 5 }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProfileDetails;
