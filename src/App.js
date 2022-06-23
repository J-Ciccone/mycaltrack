import FoodSearchPage from "./Pages/FoodSearchPage";
import { createTheme, ThemeProvider } from "@mui/material";
import { themeOptions } from "./themeOptions";
import Nav from "./Components/UI/Nav";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProfilePage from "./Pages/ProfilePage";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserContext } from "./Context/FoodTableContext";

//TODO set retrieve user details from DB on login, set it here, provide, userDetails, setUsedetails => ProfileDetails
const App = () => {
  const [log, setLog] = useState(false);
  const [userDetails,setUserDetails] = useState();
  const theme = createTheme(themeOptions);
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLog(true);
      // ...
    } else {
      // User is signed out
      setLog(false);
    }
  });

  return (
    <BrowserRouter forceRefresh={true}>
      <ThemeProvider theme={theme}>
        <UserContext.Provider>
          <Nav></Nav>
          {log ? (
            <Routes>
              <Route path="home" element={<HomePage />} />
              <Route path="profile" element={<ProfilePage />}></Route>
              <Route path="tracker" element={<FoodSearchPage />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="login" element={<LoginPage />}></Route>
              <Route path="signup" element={<SignupPage />}></Route>
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          )}
        </UserContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
