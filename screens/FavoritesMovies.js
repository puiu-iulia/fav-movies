import React, { useState, useEffect, useCallback } from 'react';
import { View, ActivityIndicator, StyleSheet, FlatList, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Movie from '../components/Movie';
import * as movieActions from '../store/actions/movies';

import Card from '../components/Card';

const FavoritesMovies = props => {

    const [isLoading, setIsLoading ]  = useState(false);
    const [error, setError ] = useState();
    const movies = useSelector(state => state.movies.popularMovies);
    console.log(movies);
    const dispatch = useDispatch();

    const loadMovies = useCallback(async () => {
        setError(null);
        try {
            await dispatch(movieActions.fetchPopular());
        } catch (err) {
            setError(err.message);
        }
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        setIsLoading(true);
        loadMovies().then(() => {
            setIsLoading(false);
        });
    }, [dispatch, loadMovies]);

    const selectMovieHandler = () => {

    };

    if (error) {
        return (
            <Text>An error occured.</Text>
        )
    }

    if (isLoading) {
        return (
            <View>
                <ActivityIndicator size='large' color='#000' />
            </View>
        );
    }
    return (
        <View style={styles.screen}>
        {/* <Text>Movies</Text> */}
            <FlatList
                style={{width: '100%'}} 
                data={movies}
                keyExtractor={item => item.title}
                renderItem={itemData => (
                    <Movie
                        image={itemData.item.imageUrl}
                        onSelect={() => {
                            selectItemHandler();
                        }}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});

export default FavoritesMovies;