/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
 import {createStore,combineReducers} from 'redux'
import {Provider} from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension';

import productReducer from './store/reducers/products'
import cartReducer from './store/reducers/cart'
import orderReducer from './store/reducers/orders'

import ShopNavigator from './navigation/shopnavigator'

const rootReducer=combineReducers({
  product:productReducer,
  cart:cartReducer,
  order:orderReducer
});

const store=createStore(rootReducer, composeWithDevTools());

const App = () => {

  return (
    <Provider store={store}>
      <ShopNavigator/>
    </Provider>
  );
}

export default App;
