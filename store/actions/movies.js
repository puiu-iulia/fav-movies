import Movie from '../../models/movie';
import MovieDbApi from '../../MovieDbAPI';
import { openDatabase } from 'react-native-sqlite-storage';
import Database from '../../data/Database';

export const GET_POPULAR = 'GET_POPULAR';
export const GET_TOPRATED = 'GET_TOPRAED';
export const GET_FAVORITES = 'GET_FAVORITES';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

const db = openDatabase("db");

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
            dispatch({
                type: GET_TOPRATED,
                topRatedMovies: topRatedMovies
            })
        } catch (err) {
            throw err;
        }
    };
};

export const initDB = () => {
    return async () => {
        try {
            await  db.transaction((tx) => {
                tx.executeSql('CREATE TABLE IF NOT EXISTS Movies (id, title, imageUrl, rating, releaseDate, overview);');
            }
        } catch (err) {
            throw err;
        }
    };
};

export const closeDB = () => {
    return async () => {
        if (db) {
            await db.close()
            .catch((err) => {
                console.log(err);
            })  
        }    
    }
}


export const closeDB = () => {
    return async () => {
        if (db) {
            await db.close()
            .catch((err) => {
                console.log(err);
            })  
        }    
    }
}

export const getFavorites = () => {
    return async (dispatch) => {
        let movies = [];
        await db.transaction((tx) => {
            tx.executeSql('SELECT m.id, m.title, m.imageUrl, m.rating, m.realeaseDate, m.overview FROM Movie m', [])    
        .then(([tx, results]) => {
            movies = results;
            dispatch({
                type: GET_FAVORITES,
                favoriteMovies: movies
            })
        }).catch((err) => {
            console.log(err);
        })      
    }
    }
}

export const addFavorite = (id) => {
    return async (dispatch) => {
        let movies = [];
        db.addFavoriteMovie(id).then((data) => {
            movies = data;
            dispatch({
                type: REMOVE_FAVORITE,
                pid: id
            })
        }).catch((err) => {
            console.log(err);
        })      
    }
}

export const removeFavorite = (id) => {
    return async (dispatch) => {
        let movies = [];
        db.removeFavorite(id).then((data) => {
            movies = data;
            dispatch({
                type: REMOVE_FAVORITE,
                mid: id
            })
        }).catch((err) => {
            console.log(err);
        })      
    }
}
