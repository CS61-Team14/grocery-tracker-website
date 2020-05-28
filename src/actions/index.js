import axios from 'axios';

const ROOT_URL = 'https://rodrigo-lab5.herokuapp.com/api';
// const ROOT_URL = 'http://localhost:9090/api';

// keys for actiontypes
export const ActionTypes = {
  FETCH_PRODUCTS: 'FETCH_PRODUCTS',
  FETCH_PRODUCT: 'FETCH_PRODUCT',
  CREATE_STORE: 'CREATE_STORE',
  FETCH_STORES: 'CREATE_STORE',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
};

export function fetchProductss() {
  /* axios get */
  return (dispatch) => {
    axios.get(`${ROOT_URL}/products`)
      .then((response) => {
        // once we are done fetching we can dispatch a redux action with the response data
        dispatch({ type: ActionTypes.FETCH_PRODUCTS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function createProduct(post, history) {
  /* axios post */
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts`, post, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        history.push('/');
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

// export function updateProduct(post, id) {
//   /* axios put */
//   return (dispatch) => {
//     axios.put(`${ROOT_URL}/posts/${id}`, post, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
//       dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
//     }).catch((error) => {
//       dispatch({ type: ActionTypes.ERROR_SET, error });
//     });
//   };
// }

// export function fetchPost(id) {
//   /* axios get */
//   return (dispatch) => {
//     axios.get(`${ROOT_URL}/posts/${id}`).then((response) => {
//       dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
//     }).catch((error) => {
//       dispatch({ type: ActionTypes.ERROR_SET, error });
//     });
//   };
// }

export function deleteProduct(id, history) {
  /* axios delete */
  console.log('sending delete request');
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/products/${id}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      history.push('/products');
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, error });
    });
  };
}

export function fetchStores() {
  /* axios get */
  return (dispatch) => {
    axios.get(`${ROOT_URL}/stores`)
      .then((response) => {
        // once we are done fetching we can dispatch a redux action with the response data
        dispatch({ type: ActionTypes.FETCH_PRODUCTS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function createStore(post, history) {
  /* axios post */
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts`, post, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        history.push('/');
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function updateStore(post, id) {
  /* axios put */
  return (dispatch) => {
    axios.put(`${ROOT_URL}/stores/${id}`, post, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
    }).catch((error) => {
      dispatch({ type: ActionTypes.ERROR_SET, error });
    });
  };
}

export function deleteStore(id) {
  /* axios delete */
  console.log('sending delete request');
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/products/${id}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      console.log(response);
      // history.push('/products');
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, error });
    });
  };
}

export function signinUser(user, history) {
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  // does an axios.post on the /signin endpoint
  // on success does:
  //  dispatch({ type: ActionTypes.AUTH_USER });
  //  localStorage.setItem('token', response.data.token);
  // on error should dispatch(authError(`Sign In Failed: ${error.response.data}`));
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, user)
      .then((response) => {
        console.log('signin response');
        dispatch({ type: ActionTypes.AUTH_USER });
        localStorage.setItem('token', response.data.token);
        history.push('/');
      })
      .catch((error) => {
        console.log(`signin error: ${error}`);

        // eslint-disable-next-line no-alert
        alert('Wrong Username or Password');
        dispatch({ type: ActionTypes.AUTH_ERROR, message: `Sign in Failed: ${error}` });
      });
  };
}


export function signupUser(user, history) {
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  // does an axios.post on the /signup endpoint (only difference from above)
  // on success does:
  //  dispatch({ type: ActionTypes.AUTH_USER });
  //  localStorage.setItem('token', response.data.token);
  // on error should dispatch(authError(`Sign Up Failed: ${error.response.data}`));
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, user)
      .then((response) => {
        dispatch({ type: ActionTypes.AUTH_USER });
        localStorage.setItem('token', response.data.token);
        history.push('/');
      })
      .catch((error) => {
        // eslint-disable-next-line no-alert
        alert('Error Signing Up, verify Email is not already taken');
        dispatch({ type: ActionTypes.AUTH_ERROR, message: `Sign up Failed: ${error}` });
      });
  };
}


// deletes token from localstorage
// and deauths
export function signoutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    history.push('/');
  };
}

// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}
