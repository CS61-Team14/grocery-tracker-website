import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';

import NewProduct from './newproduct';
import NewStore from './newstore';
import Products from './products';
import Stores from './stores';
import SignIn from './signin';
import SignUp from './signup';
import NavBar from './navbar';
import Home from './home';

// import PrivateRoute from './privateRoute';


const App = (props) => {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/products/new" component={NewProduct} />
          <Route path="/stores/new" component={NewStore} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/products" component={Products} />
          <Route path="/stores" component={Stores} />
          {/* <Route path="/posts/:id" component={Post} /> */}
          <Route render={() => (<div>post not found </div>)} />
        </Switch>

      </div>
    </Router>
  );
};

export default App;
