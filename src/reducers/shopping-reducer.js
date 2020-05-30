import { ActionTypes } from '../actions';

const initialState = {
  all: [],
};


const ShoppingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_SHOPPING_LIST:
      return { all: action.payload };
    default:
      return state;
  }
};

export default ShoppingReducer;
