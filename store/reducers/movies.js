import { GET_POPULAR, GET_TOPRATED, GET_FAVORITES } from '../actions/movies';
import Movie from '../../models/movie';

const initialState = {
    popularMovies: [],
    topRatedMovies: []
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
    }
    return state;
};