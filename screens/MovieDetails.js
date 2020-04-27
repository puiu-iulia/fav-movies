import React from 'react';
import { View, ScrollView, StyleSheet, Image, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Card from '../components/Card';
import * as MovieActions from '../store/actions/movies';

const MovieDetails = props => {
    const movieId = props.navigation.getParam('movieId');
    const selectedMovie = useSelector(state => 
        state.movies.popularMovies.find(movie => movie.id === movieId)
    );
    const dispatch = useDispatch();

    return (
        <ScrollView style={styles.screen}>
            <View style={styles.dataContainer}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: selectedMovie.imageUrl }} />
                </View>
                <View>
                    <Text>Rating: {selectedMovie.rating}/10</Text>
                    <Text>Year: {selectedMovie.releaseDate.slice(0, 4)}</Text>
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
    }
});

MovieDetails.navigationOptions = navData => {
    return {
      headerTitle: navData.navigation.getParam('movieTitle')
    };
  };

export default MovieDetails;