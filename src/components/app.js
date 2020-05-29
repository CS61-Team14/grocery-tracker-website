import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';

import NewProduct from './newproduct';
import NewStore from './newstore';
import EditStore from './editstore';
import Products from './products';
import Stores from './stores';
import SignIn from './signin';
import SignUp from './signup';
import NavBar from './navbar';
import Home from './home';

import PrivateRoute from './privateRoute';


const App = (props) => {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/products/new" component={NewProduct} />
          <PrivateRoute path="/stores/new" component={NewStore} />
          <PrivateRoute path="/stores/edit" component={EditStore} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <PrivateRoute path="/products" component={Products} />
          <PrivateRoute path="/stores" component={Stores} />
          {/* <Route path="/posts/:id" component={Post} /> */}
          <Route render={() => (<div>post not found </div>)} />
        </Switch>

      </div>
    </Router>
  );
};

export default App;
