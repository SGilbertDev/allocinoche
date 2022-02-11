import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "@csstools/normalize.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Movies from "@core/Movies";
import MoviesContext from "@context/MoviesContext";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});
const moviesInstance = new Movies();

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FCAE1E",
    },
  },
});

ReactDOM.render(
  <StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <MoviesContext.Provider value={moviesInstance}>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </MoviesContext.Provider>
        </BrowserRouter>
      </QueryClientProvider>
    </RecoilRoot>
  </StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
