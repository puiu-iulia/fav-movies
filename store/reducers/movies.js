import { GET_POPULAR, GET_TOPRATED, GET_FAVORITES } from '../actions/movies';
import Movie from '../../models/movie';

const initialState = {
    popularMovies: []
};

export default ( state = initialState, action ) => {
    switch (action.type) {
        case GET_POPULAR: 
            return {
                popularMovies: action.popularMovies
            };
        case GET_TOPRATED: {
            return {
                movies: action.topRatedMovies
            };
        }
    }
    return state;
};