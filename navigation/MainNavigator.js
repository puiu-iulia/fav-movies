import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';

import FavoritesMovies from '../screens/FavoritesMovies';
import PopularMovies from '../screens/PopularMovies';
import TopRatedMovies from '../screens/TopRatedMovies';
import MovieDetails from '../screens/MovieDetails';

const FavoritesNavigator = createStackNavigator({
        Favorites: FavoritesMovies,
        MovieDetails: MovieDetails
    }, {

    }
);

const PopularNavigator = createStackNavigator({
        Popular: PopularMovies,
        PopDetails: MovieDetails
    }, {

    }
);

const TopRatedNavigator = createStackNavigator({
    TopRated: TopRatedMovies,
    topDetails: MovieDetails
    }, {

    }
);

const tabScreenConfig = {
    Pop: {
        screen: PopularNavigator,
        navigationOptions: {
            tabBarLabel: 'Popular',
        }
    },
    Top: {
        screen: TopRatedNavigator,
        navigationOptions: {
            tabBarLabel: 'Top Rated',
        }
    },
    Fav: {
        screen: FavoritesNavigator,
        navigationOptions: {
            tabBarLabel: 'Favorites',
        }
    }
};

const TopNavigator = createMaterialTopTabNavigator(tabScreenConfig,
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#FFFFFF',
      inactiveTintColor: '#F8F8F8',
      style: {
        backgroundColor: '#633689',
      },
      labelStyle: {
        textAlign: 'center',
      },
      indicatorStyle: {
        borderBottomColor: '#87B56A',
        borderBottomWidth: 2,
      },
    },
  }    
);

const MainNavigator = createStackNavigator({
    TabScreen: {
        screen: TopNavigator,
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#000'
            },
            headerTintColor: '#fff',
            title: 'My Movies'
        }
    }
})



export default createAppContainer(MainNavigator);