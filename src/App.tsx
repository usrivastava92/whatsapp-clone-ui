import React from "react";
import { AppContextProvider } from "./contexts/AppContext";
import { BrowserRouter } from "react-router-dom";
import { useMediaQuery } from "@material-ui/core";
import AppRouter from "./AppRouter/AppRouter";
import "./styles/Style.scss";

const App = () => {
  const isMobile = useMediaQuery("(max-width:950px)");

  return (
      <AppContextProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </AppContextProvider >
    );
};

export default App;
