import React from "react";
import { Box, ButtonBase } from "@mui/material";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import SearchInput from "../search-input/SearchInput";
import useSearch from "../../hooks/search/useSearch";
import HeaderComponents from "./Header.styles";
import useMovieDetail from "../../hooks/movie-detail/useMovieDetail";
import useMovieSnapshot from "../../hooks/movie-snapshot/useMovieSnapshot";
import useSearchResults from "../../hooks/search-results/useSearchResults";

const Header = () => {
  const { isLoading, search, query, setQuery } = useSearch();
  const { totalResults } = useSearchResults();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useMovieDetail();
  const { toggle, isInFavourites } = useMovieSnapshot(id || "");

  return (
    <HeaderComponents.HeaderWrapper>
      <Box>
        <HeaderComponents.LinkButton onClick={() => navigate("/")} active={pathname === "/"}>
          Home
        </HeaderComponents.LinkButton>
        <HeaderComponents.LinkButton onClick={() => navigate("/search")} active={pathname === "/search"}>
          Search
        </HeaderComponents.LinkButton>
        <HeaderComponents.LinkButton onClick={() => navigate("/favourites")} active={pathname === "/favourites"}>
          Favourites
        </HeaderComponents.LinkButton>
      </Box>
      <Box>
        <Routes>
          <Route
            path="/search"
            element={
              totalResults > 0 ? (
                <SearchInput
                  value={query}
                  searchButtonDisabled={isLoading}
                  onInputChange={setQuery}
                  onSearchClick={search}
                />
              ) : null
            }
          />
          <Route
            path="/detail/:id"
            element={
              <Box mr={2}>
                <ButtonBase
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle();
                  }}
                >
                  <StarIcon color={isInFavourites ? "secondary" : "action"} />
                </ButtonBase>
              </Box>
            }
          />
        </Routes>
      </Box>
    </HeaderComponents.HeaderWrapper>
  );
};

export default Header;
