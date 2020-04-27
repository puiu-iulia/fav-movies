import React from 'react';
import { View } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import FavoritesMovies from '../screens/FavoritesMovies';
import PopularMovies from '../screens/PopularMovies';
import TopRatedMovies from '../screens/TopRatedMovies';
import MovieDetails from '../screens/MovieDetails';

const defaultStackNavOptions = {
        
            headerStyle: {
                backgroundColor: '#90cea1',
            },
            headerTitle: "Favorite Movies",
            // headerTitleStyle: {
            //     fontFamily: 'open-sans-bold',
            // },
            // headerbackTitleStyle: {
            //     fontFamily: 'open-sans',
            // },
            headerTintColor: '#0d253f' 
            // for IOS, white background is more common
}

const FavoritesNavigator = createStackNavigator({
        Favorites: FavoritesMovies,
        MovieDetails: MovieDetails
    }, {
        defaultNavigationOptions: defaultStackNavOptions
    }
);

const PopularNavigator = createStackNavigator({
        Popular: PopularMovies,
        PopDetails: MovieDetails
    }, {
        defaultNavigationOptions: defaultStackNavOptions
    }
);

const TopRatedNavigator = createStackNavigator({
        TopRated: TopRatedMovies,
        TopDetails: MovieDetails
    }, {
        defaultNavigationOptions: defaultStackNavOptions
    }
);

const tabScreenConfig = {
    Pop: {
        screen: PopularNavigator,
        navigationOptions: {
            tabBarLabel: 'Popular',
            tabBarIcon: (tabInfo) => {
                return(<Ionicons name='ios-people' size={24} color={tabInfo.tintColor} />)
            },
            barStyle: {backgroundColor: '#90cea1'}
        }
    },
    Top: {
        screen: TopRatedNavigator,
        navigationOptions: {
            tabBarLabel: 'Top Rated',
            tabBarIcon: (tabInfo) => {
                return(<Ionicons name='ios-medal' size={24} color={tabInfo.tintColor} />)
            },
            barStyle: {backgroundColor: '#90cea1'}
        }
    },
    Fav: {
        screen: FavoritesNavigator,
        navigationOptions: {
            tabBarLabel: 'Favorites',
            tabBarIcon: (tabInfo) => {
                return(<Ionicons name='ios-star' size={24} color={tabInfo.tintColor} />)
            },
            barStyle: {backgroundColor: '#90cea1'}
        }
    }
};

const MainNavigator = createMaterialBottomTabNavigator(
    tabScreenConfig,
  {
      tabBarOptions: {
        activeTintColor: "#000",
        shifting: true,
        barStyle: {backgroundColor: '#90cea1'}
      }
  }    
);

// const MainNavigator = createStackNavigator({
//     TabScreen: {
//         screen: TopNavigator,
//         navigationOptions: {
//             headerStyle: {
//                 backgroundColor: '#90cea1'
//             },
//             headerTintColor: '#0d253f',
//             // title: <View><SvgUri width='100' height='40' source={{uri:'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg'}} /></View>
//             title: 'Favorite Movies'
//         }
//     }
// })



export default createAppContainer(MainNavigator);