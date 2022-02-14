import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "@csstools/normalize.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import MovieApi from "@core/MovieApi";
import MovieApiContext from "@context/MovieApiContext";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});
const movieApiInstance = new MovieApi();

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
          <MovieApiContext.Provider value={movieApiInstance}>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </MovieApiContext.Provider>
        </BrowserRouter>
      </QueryClientProvider>
    </RecoilRoot>
  </StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
