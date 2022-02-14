import React from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import Home from "@pages/Home";
import List from "@pages/List";
import MovieItem from "@pages/MovieItem";
import Favorite from "@pages/Favorite";
import NotFound from "@pages/NotFound";

import "@styles/App.css";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<List />} />
        <Route path="/movie/:id" element={<MovieItem />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
