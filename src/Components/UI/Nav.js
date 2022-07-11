import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Button,
  Divider,
  List,
  Drawer,
  IconButton,
  ListItem,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../Context/Context";
import { useContext, useState } from "react";
import { getAuth } from "firebase/auth";

const Nav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const context = useContext(UserContext);
  let activeStyle = {
    textDecoration: "none",
    color: "#FFB453",
  };

  let inactiveStyle = {
    textDecoration: "none",
    color: "white",
  };

  const logout = () => {
    const auth = getAuth();
    auth.signOut();
  };
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar component="nav" position="static" color="primary">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{
              display: "flex",
              flexGrow: 1,
              pr: 1,
            }}
          >
            MyCalTrack{" "}
            <Box sx={{ width: "2rem", height: "2rem" }}>
              <img
                src={require("../../assets/favicon.PNG")}
                alt={"logo"}
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
          </Typography>
          {!context.log && (
            <>
              <Button
                sx={{ color: "white", display: { xs: "none", sm: "flex" } }}
              >
                <NavLink
                  style={({ isActive }) =>
                    isActive ? activeStyle : inactiveStyle
                  }
                  to="login"
                >
                  Log in
                </NavLink>
              </Button>

              <Button
                sx={{ color: "white", display: { xs: "none", sm: "flex" } }}
              >
                <NavLink
                  style={({ isActive }) =>
                    isActive ? activeStyle : inactiveStyle
                  }
                  to="signup"
                >
                  Sign Up
                </NavLink>
              </Button>
            </>
          )}
          {context.log && (
            <>
              <Button
                sx={{ color: "white", display: { xs: "none", sm: "flex" } }}
              >
                <NavLink
                  style={({ isActive }) =>
                    isActive ? activeStyle : inactiveStyle
                  }
                  to="profile"
                >
                  Profile
                </NavLink>
              </Button>

              <Button
                sx={{ color: "white", display: { xs: "none", sm: "flex" } }}
              >
                <NavLink
                  style={({ isActive }) =>
                    isActive ? activeStyle : inactiveStyle
                  }
                  to="tracker"
                >
                  Tracker
                </NavLink>
              </Button>

              <Button
                sx={{ color: "white", display: { xs: "none", sm: "flex" } }}
                onClick={logout}
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
              backgroundColor: "#609BC5",
            },
          }}
        >
          <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            {!context.log && (
              <List>
                <ListItem>
                  <Button sx={{ color: "white" }}>
                    <NavLink
                      style={({ isActive }) =>
                        isActive ? activeStyle : inactiveStyle
                      }
                      to="login"
                    >
                      Login
                    </NavLink>
                  </Button>
                </ListItem>
                <ListItem>
                  <Button sx={{ color: "white" }}>
                    <NavLink
                      style={({ isActive }) =>
                        isActive ? activeStyle : inactiveStyle
                      }
                      to="signup"
                    >
                      Sign Up
                    </NavLink>
                  </Button>
                </ListItem>
              </List>
            )}
            {context.log && (
              <List>
                <ListItem>
                  <Button sx={{ color: "white" }}>
                    <NavLink
                      style={({ isActive }) =>
                        isActive ? activeStyle : inactiveStyle
                      }
                      to="profile"
                    >
                      Profile
                    </NavLink>
                  </Button>
                </ListItem>
                <ListItem>
                  <Button sx={{ color: "white" }}>
                    <NavLink
                      style={({ isActive }) =>
                        isActive ? activeStyle : inactiveStyle
                      }
                      to="tracker"
                    >
                      Tracker
                    </NavLink>
                  </Button>
                </ListItem>

                <ListItem>
                  <Button sx={{ color: "white" }} onClick={logout}>
                    Logout
                  </Button>
                </ListItem>
              </List>
            )}
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
};

export default Nav;
