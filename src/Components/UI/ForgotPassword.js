import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    const auth = getAuth();

    const data = new FormData(event.currentTarget);

    const email = data.get("email");
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setEmailSent(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <Paper sx={{
          mx: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px:1,
          pt:3
        }}>
      <Box
        
      >
        {emailSent ? (
          <>
            <Typography variant="h3" sx={{ my: 1 }}>
              Password Reset
            </Typography>
            <Typography>
              Check your email to reset your password!
            </Typography>
            <Typography>
                    <NavLink
                      style={{ textDecoration: "none", color: "#609BC5" }}
                      to="/login"
                    >
                      Back to Log in.
                    </NavLink>
                  </Typography>
          </>
        ) : (
          <>
           <Typography variant="h4" sx={{ my: 1 }}>
              Password Reset
            </Typography>
            <Typography>
              We'll send you an email to reset your password!
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ my: 3, mr: 5 }}
              >
                Send
              </Button>
              <Grid container>
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
          </>
        )}
      </Box>
    </Paper>
  );
};

export default ForgotPassword;
