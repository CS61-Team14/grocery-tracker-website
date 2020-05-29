import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  current: {},
};


const ProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_PRODUCT:
      return { all: state.all, current: action.payload };
    case ActionTypes.FETCH_PRODUCTS:
      return { all: action.payload, current: state.current };
    default:
      return state;
  }
};

export default ProductsReducer;
