import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import styled from "styled-components";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AboutUs from "./pages/AboutUs";
import Connect from "./pages/Connect";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Reservations from "./pages/Reservations";
import Takeout from "./pages/Takeout";

const AppContainer = styled.div`
  font-family: "Arial", sans-serif;
  color: #333;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/takeout" element={<Takeout />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
        <Footer />
      </AppContainer>
    </Router>
  );
}

export default App;
