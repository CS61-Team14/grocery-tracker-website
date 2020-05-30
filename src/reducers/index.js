// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';

import ProductsReducer from './products-reducer';
import StoresReducer from './stores-reducer';
import AuthReducer from './auth-reducer';
import ShoppingReducer from './shopping-reducer';

// const rootReducer = combineReducers({
//   count: CountReducer,
// });

const rootReducer = combineReducers({
  products: ProductsReducer,
  stores: StoresReducer,
  auth: AuthReducer,
  shoppingList: ShoppingReducer,
});

export default rootReducer;
