import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Homepage from "./components/hompage";
import "bootstrap/dist/css/bootstrap.min.css";
import Gallery from "./components/gallery";
import CatCategory from "./components/category";
import SignIn from "./components/signin";
import SignUp from "./components/signup";
import NotLogin from "./components/notLogin";
import Profile from "./components/useProfile";

const App = () => {
  const location = useLocation();

  const isAuthPage = location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <>
      {!isAuthPage && <Header />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/category" element={<CatCategory />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/unauthenticated" element={<NotLogin />} />
      </Routes>
      {!isAuthPage && <Footer />}
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);
