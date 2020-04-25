import React from 'react';
import { View, Dimensions, Image, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';

import Card from '../components/Card';

const Movie = props => {
    let TouchableComponent = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21 ) {
        TouchableComponent = TouchableNativeFeedback;
    }

    return (
        <View style={styles.movie}>
            <View styles={styles.touchable}>
                <TouchableComponent onPress={props.onSelect} useForeground>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{ uri: props.image }} />
                    </View>
                </TouchableComponent>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    movie: {
        height: Dimensions.get('window').height/2.7,
        width: Dimensions.get('window').width/2.15,
        marginLeft: 8,
        marginTop: 8
    },
    touchable: {
        borderRadius: 8,
        overflow: 'hidden'
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

export default Movie;