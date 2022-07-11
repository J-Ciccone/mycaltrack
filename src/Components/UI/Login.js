import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { Box, Grid, Link } from "@mui/material";
import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const handleLogin = (event) => {
    event.preventDefault();
    const auth = getAuth();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode + ": " + errorMessage);
        // ..
      });
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
          Log in
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ my: 3, mr: 5 }}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
            <Typography>
                <NavLink
                  style={{ textDecoration: "none", color: "#609BC5" }}
                  to="/forgot"
                >
                  Forgot Password.
                </NavLink>
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                <NavLink
                  style={{ textDecoration: "none", color: "#609BC5" }}
                  to="/signup"
                >
                  Don't have and account? Sign up.
                </NavLink>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
};

export default Login;
