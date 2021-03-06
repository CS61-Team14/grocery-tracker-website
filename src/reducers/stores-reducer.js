import { ActionTypes } from '../actions';

const initialState = {
  // all: [{ name: 'Store A', address: '7011 Pendergast St.Erlanger, KY 41018', id: 101 },
  //   { name: 'Store B', address: '5011 Pendergast St.Erlanger, KY 41018', id: 201 },
  //   { name: 'Store C', address: '3011 Pendergast St.Erlanger, KY 41018', id: 301 }],
  all: [],
  current: {},
};


const StoresReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_STORES:
      return { all: action.payload, current: state.current };
    case ActionTypes.SET_STORE:
      return { all: state.all, current: action.payload };
    default:
      return state;
  }
};

export default StoresReducer;
