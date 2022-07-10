import React, { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./config";
import { GroceriesList } from "./pages";

const App: FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Router>
        <Routes>
          <Route path="/*" element={<GroceriesList />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
