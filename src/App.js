import React from "react";
import "./App.css";
import Main from "./containers/Main";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom"; // Add this import
import { chosenTheme } from "./theme";
import { GlobalStyles } from "./global";
import { PortfolioDataProvider } from "./PortfolioDataProvider";

function App() {
    return (
        <ThemeProvider theme={chosenTheme}>
            <>
                <GlobalStyles />
                <BrowserRouter basename="/">
                    <div>
                        <PortfolioDataProvider>
                            <Main theme={chosenTheme} />
                        </PortfolioDataProvider>
                    </div>
                </BrowserRouter>
            </>
        </ThemeProvider>
    );
}

export default App;