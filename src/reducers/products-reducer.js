import { ActionTypes } from '../actions';

const initialState = {
  all: [{ ProductName: 'Product1', DaysLeft: 6, id: 1 }, { ProductName: 'Product2', DaysLeft: 4, id: 2 }, { ProductName: 'Product3', DaysLeft: 1, id: 3 }],
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
