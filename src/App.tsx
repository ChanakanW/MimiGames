import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";
import theme from "./locales/th/theme"; 
import Sudoku from "./pages/Games/Sudoku";
import CupsAndBall from "./pages/Games/CupsAndBall";
import MatchingGames from "./pages/Games/MatchingGames/MatchingGames";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        {/* <Route path="/" element={<CupsAndBall />} /> */}
        {/* <Route path="/" element={<Sudoku />} /> */}
        <Route path="/" element={<MatchingGames />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
