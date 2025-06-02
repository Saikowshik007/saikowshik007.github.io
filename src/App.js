import React from "react";
import "./App.css";
import Main from "./containers/Main";
import { ThemeProvider } from "styled-components";
import { chosenTheme } from "./theme";
import { GlobalStyles } from "./global";
import { PortfolioDataProvider } from "./PortfolioDataProvider";

function App() {
    return (
        <ThemeProvider theme={chosenTheme}>
            <>
                <GlobalStyles />
                <div>
                    <PortfolioDataProvider>
                        <Main theme={chosenTheme} />
                    </PortfolioDataProvider>
                </div>
            </>
        </ThemeProvider>
    );
}

export default App;