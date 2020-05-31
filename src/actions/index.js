import axios from 'axios';

const ROOT_URL = 'http://localhost:3307/api';

// keys for actiontypes
export const ActionTypes = {
  FETCH_PRODUCTS: 'FETCH_PRODUCTS',
  FETCH_PRODUCT: 'FETCH_PRODUCT',
  FETCH_SHOPPING_LIST: 'FETCH_SHOPPING_LIST',
  CREATE_STORE: 'CREATE_STORE',
  FETCH_STORES: 'CREATE_STORE',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  SET_STORE: 'SET_STORE',
  ERROR_SET: 'ERROR_SET',
};

export function fetchShoppingList(store) {
  /* axios get */
  console.log('Sending Shopping list request');
  const param = `?storeID=${store}`;
  // const route = `${ROOT_URL}/shoppingList${param}`;
  // console.log(route);
  return (dispatch) => {
    console.log('Axios: Fetching shopping list');
    axios
      .get(`${ROOT_URL}/shoppingList${param}`, {
        headers: { authorization: localStorage.getItem('token') },
      })
      .then((response) => {
        // once we are done fetching we can dispatch a redux action with the response data
        console.log(response);
        dispatch({ type: ActionTypes.FETCH_SHOPPING_LIST, payload: response.data.response });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function buyStuff(stuffToBuy) {
  console.log('In Buy Stuff!');
  return (dispatch) => {
    console.log('goneShopping Axios call');
    axios
      .post(`${ROOT_URL}/inventory/goneShopping`, { products: stuffToBuy }, {
        headers: { authorization: localStorage.getItem('token') },
      })
      .then((response) => {
        // once we are done fetching we can dispatch a redux action with the response data
        const param = '?storeID=all';
        console.log('got a Response');
        axios
          .get(`${ROOT_URL}/shoppingList${param}`, {
            headers: { authorization: localStorage.getItem('token') },
          })
          .then((response2) => {
            // once we are done fetching we can dispatch a redux action with the response data
            // console.log('RESPONSE 2');
            // console.log(response2);
            dispatch({ type: ActionTypes.FETCH_SHOPPING_LIST, payload: response2.data.response });
          });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function fetchProducts() {
  /* axios get */
  return (dispatch) => {
    axios
      .get(`${ROOT_URL}/productsByUser`, {
        headers: { authorization: localStorage.getItem('token') },
      })
      .then((response) => {
        // once we are done fetching we can dispatch a redux action with the response data
        dispatch({ type: ActionTypes.FETCH_PRODUCTS, payload: response.data.response });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function createProduct(product, stores, history) {
  /* axios post */
  return (dispatch) => {
    axios.put(`${ROOT_URL}/products/new`, product, {
      headers: { authorization: localStorage.getItem('token') },
    })
      .then((response) => {
        console.log('Got response 1');
        const newID = response.data.response.insertId;
        const newProd = { ProductID: newID, InventoryRemainingDays: product.remainingDays, stores };
        if (stores.length >= 1) {
          axios.put(`${ROOT_URL}/storeProducts/new`, newProd, {
            headers: { authorization: localStorage.getItem('token') },
          });
        }
        axios.put(`${ROOT_URL}/inventory/new`, newProd, {
          headers: { authorization: localStorage.getItem('token') },
        }).then((response2) => {
          history.push('/products');
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function deleteProduct(id) {
  /* axios delete */
  console.log('sending delete request');
  return (dispatch) => {
    axios
      .delete(
        `${ROOT_URL}/products/delete/${id}`,
        { headers: { authorization: localStorage.getItem('token') } },
      )
      .then((response) => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function fetchStores() {
  console.log('doing a fetch stores');
  return (dispatch) => {
    axios
      .get(`${ROOT_URL}/storesByUser`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
      // once we are done fetching we can dispatch a redux action with the response data
        console.log('got response!');
        console.log(response.data.response);
        dispatch({ type: ActionTypes.FETCH_STORES, payload: response.data.response });
      })
      .catch((error) => {
        console.log('got error!');
        console.log(`ERRROR: ${error}`);
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function createStore(store, history) {
  console.log('creating a store');
  return (dispatch) => {
    axios
      .put(`${ROOT_URL}/stores/new`, store, {
        headers: { authorization: localStorage.getItem('token') },
      })
      .then((response) => {
        console.log(response);
        const newID = response.data.response.insertId;
        console.log(`ID is: ${newID}`);
        console.log('putting into rel table');
        axios.put(`${ROOT_URL}/stores/newUser`, { StoreID: newID }, {
          headers: { authorization: localStorage.getItem('token') },
        }).then((response2) => {
          history.push('/stores');
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function updateStore(store, history) {
  /* axios put */
  console.log('calling updatescore');
  console.log(`store is :${JSON.stringify(store)}`);
  return (dispatch) => {
    axios
      .post(`${ROOT_URL}/stores/update`, store, {
        headers: { authorization: localStorage.getItem('token') },
      })
      .then((response) => {
        history.push('/stores');
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function deleteStore(id, history) {
  /* axios delete */
  console.log('sending delete request');
  console.log(id);
  // const storeToDelete = { StoreID: id };
  return (dispatch) => {
    axios
      .delete(
        `${ROOT_URL}/stores/delete/${id}`,
        { headers: { authorization: localStorage.getItem('token') } },
      )
      .then((response) => {
        console.log(response);
        // fetchStores();
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function setStore(store) {
  return {
    type: ActionTypes.SET_STORE,
    payload: store,
  };
}

export function signinUser(user, history) {
  console.log('Signing In');
  return (dispatch) => {
    axios
      .post(`${ROOT_URL}/signin`, user)
      .then((response) => {
        console.log(`signin response :${response}`);
        dispatch({ type: ActionTypes.AUTH_USER });
        localStorage.setItem('token', response.data.token);
        history.push('/');
      })
      .catch((error) => {
        console.log(`signin error: ${error}`);

        // eslint-disable-next-line no-alert
        // alert('Wrong Username or Password');
        dispatch({
          type: ActionTypes.AUTH_ERROR,
          message: `Sign in Failed: ${error}`,
        });
      });
  };
}

export function signupUser(user, history) {
  console.log(`Signing up user: ${JSON.stringify(user)}`);
  return (dispatch) => {
    axios
      .put(`${ROOT_URL}/signup`, user)
      .then((response) => {
        console.log(response);
        dispatch({ type: ActionTypes.AUTH_USER });
        localStorage.setItem('token', response.data.token);
        history.push('/');
      })
      .catch((error) => {
        console.log(error);
        // eslint-disable-next-line no-alert
        alert('Error Signing Up, verify Email is not already taken');
        dispatch({
          type: ActionTypes.AUTH_ERROR,
          message: `Sign up Failed: ${error}`,
        });
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

export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}
