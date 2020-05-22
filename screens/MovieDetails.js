import React, { useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet, Image, Text, Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import Card from '../components/Card';
import * as movieActions from '../store/actions/movies';

const MovieDetails = props => {
    const [isFavorite, setIsFavorite] = useState(false);
    const route = props.navigation.state.routeName;
    const movieId = props.navigation.getParam('movieId');
    let selectedMovie = null;
    const dispatch = useDispatch();
    if (route === 'PopDetails') {
        selectedMovie = useSelector(state => 
            state.movies.popularMovies.find(movie => movie.id === movieId)
        );
    } else if (route === 'TopDetails') {
        selectedMovie = useSelector(state => 
            state.movies.topRatedMovies.find(movie => movie.id === movieId)
        );
    } else if (route === 'MovieDetails') {
        selectedMovie = useSelector(state => 
            state.movies.favoriteMovies.find(movie => movie.id === movieId)
        );
        setIsFavorite(true);
    }

    const addFavoriteHandler = useCallback(async ()  => {
        try {
            await dispatch(movieActions.addFavorite(movieId));
        } catch (err) {
            console.log(err);
        }     
        setIsFavorite(true);
    }, [dispatch]);

    const removeFavoriteHandler = useCallback(async ()  => {
        try {
            await dispatch(movieActions.removeFavorite(movieId));
        } catch (err) {
            console.log(err);
        }     
        setIsFavorite(false);
    }, [dispatch]);

    let TouchableComponent = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComponent = TouchableNativeFeedback;
    }

    return (
        <ScrollView style={styles.screen}>
            <View style={styles.dataContainer}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: selectedMovie.imageUrl }} />
                </View>
                <View>
                    <Text>Rating: {selectedMovie.rating}/10</Text>
                    <Text>Year: {selectedMovie.releaseDate.slice(0, 4)}</Text>
                    <TouchableComponent
                        onPress={(!isFavorite) ? addFavoriteHandler : removeFavoriteHandler} 
                        style={styles.touchable}>
                        <View style={styles.button}>
                        <Text>{!isFavorite ? 'Mark as Favorite' : 'Remove from Favorites'}</Text>
                            {!isFavorite ?  (<Ionicons
                                name='ios-star-outline' size={24} color={'#0d253f'}
                            />)  : ( <Ionicons
                                name='ios-star' size={24} color={'#0d253f'}
                            />) }

                           
                        </View>
                    </TouchableComponent>
                </View>
            </View>
            <Text>{selectedMovie.overview}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    dataContainer: {
        flex: 1,
        flexDirection:'row',
        justifyContent: 'space-evenly'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        width: '47%',
        height: 220
    },
    touchable: {
        borderRadius: 8,
        overflow: 'hidden',
        
    },
    button: {
        marginTop: 16,
        padding: 8,
        borderRadius: 8,
        height: 56,
        width: 168,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#01b4e4', 
    }
});

MovieDetails.navigationOptions = navData => {
    return {
      headerTitle: navData.navigation.getParam('movieTitle')
    };
  };

export default MovieDetails;