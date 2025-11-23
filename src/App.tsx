import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";
import theme from "./locales/th/theme"; 
import Sudoku from "./pages/Games/Sudoku";
import CupsAndBall from "./pages/Games/CupsAndBall";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        {/* <Route path="/" element={<CupsAndBall />} /> */}
        <Route path="/" element={<Sudoku />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
