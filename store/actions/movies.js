import Movie from '../../models/movie';
import MovieDbApi from '../../MovieDbAPI';

export const GET_POPULAR = 'GET_POPULAR';
export const GET_TOPRATED = 'GET_TOPRAED';
export const GET_FAVORITES = 'GET_FAVORITES';

export const fetchPopular = () => {
    return async (dispatch) => {
        url = 'https://api.themoviedb.org/3/movie/popular?api_key=' + '010164654144fea2f691415d0ce2304a' + '&language=en-US&page=1';
        try {
            const response = await fetch(
               url 
            );
            if (!response.ok) {
                throw new Error ('Something went wrong');
            }
            const resData = await response.json();
            const popularMovies = [];
            for (const key in resData.results) {
                popularMovies.push(
                    new Movie(
                        resData.results[key].id,
                        resData.results[key].title,
                        'https://image.tmdb.org/t/p/w500' + resData.results[key].poster_path,
                        resData.results[key].vote_average,
                        resData.results[key].release_date,
                        resData.results[key].overview
                    )
                )
            }

            dispatch({
                type: GET_POPULAR,
                popularMovies: popularMovies
            })
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const fetchTopRated = () => {
    return async (dispatch) => {
        url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=' + '010164654144fea2f691415d0ce2304a' + '&language=en-US&page=1';
        try {
            const response = await fetch(
               url
            );
            if (!response.ok) {
                throw new Error ('Something went wrong');
            }
            const resData = await response.json();
            console.log(resData);
            const topRatedMovies = [];
            for (const key in resData.results) {
                topRatedMovies.push(
                    new Movie(
                        resData.results[key].id,
                        resData.results[key].title,
                        'https://image.tmdb.org/t/p/w500' + resData.results[key].poster_path,
                        resData.results[key].vote_average,
                        resData.results[key].release_date,
                        resData.results[key].overview
                    )
                )
            }
            console.log(topRatedMovies);
            dispatch({
                type: GET_TOPRATED,
                topRatedMovies: topRatedMovies
            })
        } catch (err) {
            throw err;
        }
    };
};