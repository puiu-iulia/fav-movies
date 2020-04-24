import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import ReduxThunk from 'redux-thunk';

import MainNavigator from './navigation/MainNavigator';
import { useScreens, enableScreens } from 'react-native-screens';
import movieReducer from './store/reducers/movies';

enableScreens();

const rootReducer = combineReducers({
  movies: movieReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
