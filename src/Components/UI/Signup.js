import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { Box, Grid, Link } from "@mui/material";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { MyFireStore } from "../../FireBaseValues";
import { doc, setDoc } from "firebase/firestore"; 

const Signup = () => {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    const auth = getAuth();

    const data = new FormData(event.currentTarget);

    const email = data.get("email");
    const password =
      data.get("password") === data.get("confirm-password") &&
      data.get("password");

    if (password !== false) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          return userCredential.user;

          // ...
        })
        .then((user) => {
          setDoc(doc(MyFireStore, "users", user.uid), {
            email: user.email,
            userDetailsSet: false,
            height: "",
            weight: "",
            age: "",
            gender: ""
          });

          navigate("/profile");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    }
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
          Sign Up
        </Typography>
        <Box onSubmit={handleSubmit} component="form" sx={{ mt: 1 }}>
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirm-password"
            label="Confirm Password"
            type="password"
            id="confirm-password"
            autoComplete="confirm-current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ my: 3, mr: 5 }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link>Forgot password?</Link>
            </Grid>
            <Grid item>
              <Typography>
                <NavLink
                  style={{ textDecoration: "none", color: "#609BC5" }}
                  to="/login"
                >
                  Already have an account? Log in.
                </NavLink>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
};

export default Signup;
