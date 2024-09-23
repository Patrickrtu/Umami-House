import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
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
        </Routes>
        <Footer />
      </AppContainer>
    </Router>
  );
}

export default App;
