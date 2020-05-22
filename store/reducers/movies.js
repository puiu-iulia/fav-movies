import { GET_POPULAR, GET_TOPRATED, GET_FAVORITES, ADD_FAVORITE, REMOVE_FAVORITE } from '../actions/movies';
import Database from '../../data/Database';
import Movie from '../../models/movie';

const db = new Database();

const initialState = {
    popularMovies: [],
    topRatedMovies: [],
    favoriteMovies: []
};

export default ( state = initialState, action ) => {
    switch (action.type) {
        case GET_POPULAR: 
            return {
                ...state,
                popularMovies: action.popularMovies
            };
        case GET_TOPRATED: {
            return {
                ...state,
                topRatedMovies: action.topRatedMovies
            };
        }
        case GET_FAVORITES: {
            return  {
                ...state,
                favoriteMovies: action.favoriteMovies
            }
        }
        case ADD_FAVORITE: {
            const newMovie = new Movie(
                action.movieData.id,
                action.movieData.title,
                action.movieData.imageUrl,
                action.movieData.rating,
                action.movieData.releaseDate,
                action.movieData.overview,
            )
            return {
                ...state,
                favoriteMovies: state.favoriteMovies.concat(newMovie)
            };
        }
        case REMOVE_FAVORITE: 
            return {
                ...state,
                favoriteMovies: state.favoriteMovies.filter(
                    movie => movie.id !== action.mid
                )
            };
    }
    return state;
};