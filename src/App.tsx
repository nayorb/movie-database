import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import store from "./redux-store";
import SearchPage from "./pages/movies/SearchPage";
import MovieDetailPage from "./pages/movie-detail/MovieDetailPage";
import FavouriteMoviesPage from "./pages/favourite-movies/FavouriteMoviesPage";
import Header from "./components/header/Header";
import AppComponents from "./App.styles";
import "./index.css";
import theme from "./theme";
import HomePage from "./pages/home/HomePage";
import Footer from "./components/footer/Footer";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppComponents.AppWrapper>
        <BrowserRouter>
          <Provider store={store}>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/detail/:id" element={<MovieDetailPage />} />
              <Route path="/favourites" element={<FavouriteMoviesPage />} />
            </Routes>
          </Provider>
          <Footer />
        </BrowserRouter>
      </AppComponents.AppWrapper>
    </ThemeProvider>
  );
};

export default App;
