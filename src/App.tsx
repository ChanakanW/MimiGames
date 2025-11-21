// src/App.tsx
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./Section/login/LoginForm";
import AppProvider from "./components/Toolpad/AppPovider";
import Register from "./components/Register";
import theme from "./locales/th/theme"; 
import Sudoku from "./pages/Games/Sudoku";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {/* <Route path="/" element={<AppProvider />} />
          <Route path="appprovider" element={<AppProvider />} />
          <Route path="register" element={<Register />} /> */}
          <Route path="/" element={<Sudoku />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
