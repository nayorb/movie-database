import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IAppMovieDetail, IAppSearchMovie } from "./movies.types";

export interface MoviesReducerState {
  searchMovies: IAppSearchMovie[];
  totalSearchResults: number;
  searchQuery: string;
  currentPage: number;
  movieDetail?: IAppMovieDetail;
  selectedMovieId?: string;
}

const initialState: MoviesReducerState = {
  searchMovies: [],
  searchQuery: "",
  totalSearchResults: 0,
  currentPage: 1,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addSearchMovies(state, action: PayloadAction<IAppSearchMovie[]>) {
      return {
        ...state,
        searchMovies: action.payload,
      };
    },
    addTotalSearchResults(state, action: PayloadAction<number>) {
      return {
        ...state,
        totalSearchResults: action.payload,
      };
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      return {
        ...state,
        currentPage: action.payload,
      };
    },
    addMovieDetail(state, action: PayloadAction<IAppMovieDetail>) {
      return {
        ...state,
        movieDetail: action.payload,
      };
    },
    removeMovieDetail(state) {
      return {
        ...state,
        movieDetail: undefined,
      };
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      return {
        ...state,
        searchQuery: action.payload,
      };
    },
    setSelectedMovieId(state, action: PayloadAction<string | undefined>) {
      return {
        ...state,
        selectedMovieId: action.payload,
      };
    },
    resetSearch(state) {
      return {
        ...state,
        ...initialState,
      };
    },
  },
});

export const moviesSliceActions = moviesSlice.actions;
export default moviesSlice.reducer;
