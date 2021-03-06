import React, { useState, useEffect, useCallback } from 'react';
import { View, ActivityIndicator, StyleSheet, FlatList, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Movie from '../components/Movie';
import * as movieActions from '../store/actions/movies';

const TopRatedMovies = props => {
    const [isLoading, setIsLoading ]  = useState(false);
    const [error, setError ] = useState();
    const topRatedMovies = useSelector(state => state.movies.topRatedMovies);
    console.log(topRatedMovies);
    const dispatch = useDispatch();

    const loadMovies = useCallback(async () => {
        setError(null);
        try {
            await dispatch(movieActions.fetchTopRated());
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

    const selectMovieHandler = (id, title) => {
        props.navigation.navigate('TopDetails', {movieId: id, movieTitle: title })
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
            <FlatList
                numColumns={2}
                style={{ width: '100%'}} 
                data={topRatedMovies}
                keyExtractor={item => item.title}
                renderItem={itemData => (
                    <Movie
                        image={itemData.item.imageUrl}
                        onSelect={() => {
                            selectMovieHandler(itemData.item.id, itemData.item.title);
                        }}
                    >
                    </Movie>    
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


export default TopRatedMovies;