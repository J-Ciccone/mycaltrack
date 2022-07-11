import FoodSearchPage from "./Pages/FoodSearchPage";
import { createTheme, ThemeProvider } from "@mui/material";
import { themeOptions } from "./themeOptions";
import Nav from "./Components/UI/Nav";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProfilePage from "./Pages/ProfilePage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import LoadingScreen from "./Components/UI/LoadingScreen";
import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserContext } from "./Context/Context";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import { doc, getDoc } from "firebase/firestore";
import { MyFireStore } from "./FireBaseValues";

//TODO set retrieve user details from DB on login, set it here, provide, userDetails, setUsedetails => ProfileDetails
const App = () => {
  const [log, setLog] = useState(false);
  const [authFlag, setAuthFlag] = useState(true);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState();
  const theme = createTheme(themeOptions);
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (authFlag) {
        setAuthFlag(false);
        const docRef = doc(MyFireStore, "users", user.uid);
        getDoc(docRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              console.log("User found");
              setUserDetails(snapshot.data());
            } else {
              alert("Error: User not found");
              console.log("Error: User not found");
            }
          })
          .then(() => {
            setLog(true);
            setLoading(false);
          });
      }
      // ...
    } else {
      // User is signed out
      setLog(false);
      setLoading(false);
      setUserDetails(undefined);
    }
  });
  
  return (
    <BrowserRouter >
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={{ userDetails, setUserDetails, log }}>
          <Nav></Nav>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              {log ? (
                <Routes>
                  <Route path="profile" element={<ProfilePage />}></Route>
                  <Route path="tracker" element={<FoodSearchPage />} />
                  <Route path="*" element={<Navigate to="/tracker" />} />
                </Routes>
              ) : (
                <Routes>
                  <Route path="login" element={<LoginPage />}></Route>
                  <Route path="signup" element={<SignupPage />}></Route>
                  <Route path="forgot" element={<ForgotPasswordPage />}></Route>
                  <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
              )}
            </>
          )}
          <></>
        </UserContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
