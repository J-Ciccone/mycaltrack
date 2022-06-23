import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";

const Nav = () => {
  let activeStyle = {
    textDecoration: "none",
    color: "#FFB453",
  };

  let inactiveStyle = {
    textDecoration: "none",
    color:"white"
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink style={{ textDecoration: "none", color: "white" }} to="home">
              CalPal
            </NavLink>
          </Typography>

          <Button sx={{color:"white"}}>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
              to="profile"
            >
              Profile
            </NavLink>
          </Button>

          <Button sx={{color:"white"}}>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
              to="tracker"
            >
              Tracker
            </NavLink>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav;
