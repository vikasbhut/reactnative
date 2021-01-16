/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
 import {createStore,combineReducers,applyMiddleware,compose} from 'redux'
import {Provider} from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk'
import productReducer from './store/reducers/products'
import cartReducer from './store/reducers/cart'
import orderReducer from './store/reducers/orders'
import NavigationContainer from './navigation/NavigationContainer'
import authReducer from './store/reducers/Auth'
const rootReducer=combineReducers({
  product:productReducer,
  cart:cartReducer,
  order:orderReducer,
  auth:authReducer
});


const store=createStore(rootReducer,(applyMiddleware(ReduxThunk)));
//const store=createStore(rootReducer,);
const App = () => {

  return (
    <Provider store={store}>
      <NavigationContainer/>
    </Provider>
  );
}

export default App;
