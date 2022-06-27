import createActionSagaHook from "../saga-action/createActionSagaHook";
import { APP_ACTIONS } from "../../config/actions";
import { TSearchMoviesActionData } from "../../redux-store/saga-actions/search-movie/search-movie.action-saga";
import { TGetMovieDetailActionData } from "../../redux-store/saga-actions/search-movie/get-movie-detail.action-saga";

// SEARCH_MOVIE
export const useSearchMovieAction = createActionSagaHook<TSearchMoviesActionData>(APP_ACTIONS.SEARCH_MOVIES);

// SEARCH_MOVIE
export const useGetMovieDetailAction = createActionSagaHook<TGetMovieDetailActionData>(APP_ACTIONS.GET_MOVIE_DETAIL);
