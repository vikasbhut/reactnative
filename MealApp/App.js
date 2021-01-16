/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import MealsNavigator from './navigation/MealsNavigator'
import {enableScreens} from 'react-native-screens'
import {createStore,combineReducers} from 'redux'
import {Provider} from 'react-redux'
import mealsReducer from './store/reducers/meals'

enableScreens();


const rootReducer=combineReducers({
  meals:mealsReducer
});
const store=createStore(rootReducer);
const App = () => {

  return (
    <Provider store={store}>
       <MealsNavigator/>
    </Provider>
  );
}

export default App;
