import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../src/Elements/Header/Header"
import Home from "../src/Home/Home";
import Movie from "../src/Movie/Movie";
import NotFound from "../src/Elements/NotFound/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:movieId" element={<Movie />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </React.Fragment>
    </BrowserRouter>
  );
};

export default App;
