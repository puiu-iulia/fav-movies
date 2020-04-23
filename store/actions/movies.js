import Movie from '../../models/movie';
import MovieDbApi from '../../MovieDbAPI';
import MovieDetails from '../../screens/MovieDetails';

export const GET_POPULAR = 'GET_POPULAR';
export const GET_TOPRAED = 'GET_TOPRAED';
export const GET_FAVORITES = 'GET_FAVORITES';

export const fetchPopular = () => {
    return async (dispatch) => {
        url = 'https://api.themoviedb.org/3/movie/popular?api_key=';
        try {
            const response = await fetch(
               url  + MovieDbApi + '&language=en-US&page=1'
            );
            if (!response.ok) {
                throw new Error ('Something went wrong');
            }
            const resData = await response.json();
            const popularMovies = [];
            for (const key in resData) {
                popularMovies.push(
                    new Movie(
                        resData[key].id,
                        resData[key].title,
                        resData[key].poster_path,
                        resData[key].vote_average,
                    )
                )
            }

            dispatch({
                type: GET_POPULAR,
                movies: popularMovies
            })
        } catch (err) {
            throw err;
        }
    };
};

export const fetchPopular = () => {
    return async (dispatch) => {
        url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=';
        try {
            const response = await fetch(
               url  + MovieDbApi + '&language=en-US&page=1'
            );
            if (!response.ok) {
                throw new Error ('Something went wrong');
            }
            const resData = await response.json();
            const popularMovies = [];
            for (const key in resData) {
                popularMovies.push(
                    new Movie(
                        resData[key].id,
                        resData[key].title,
                        resData[key].poster_path,
                        resData[key].vote_average,
                    )
                )
            }

            dispatch({
                type: GET_POPULAR,
                movies: popularMovies
            })
        } catch (err) {
            throw err;
        }
    };
};