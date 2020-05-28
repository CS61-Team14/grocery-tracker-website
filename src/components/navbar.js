import React from 'react';
import {
  Navbar, Nav, Button,
} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { signoutUser } from '../actions/index';


const NavBar = (props) => {
  // Navbar based on example from react bootstrap website
  const buttonStyle = {
    marginLeft: '10px',
  };

  const signIn = () => {
    props.history.push('/signin');
  };

  const signUp = () => {
    props.history.push('/signup');
  };

  const goHome = () => {
    props.history.push('/');
  };

  const goProducts = () => {
    props.history.push('/products');
  };

  const goStores = () => {
    props.history.push('/stores');
  };

  // const goNewPost = () => {
  //   props.history.push('/posts/new');
  // };

  const renderButtons = () => {
    if (!props.authenticated) {
      return (
        <div>
          <Button variant="outline-primary" style={buttonStyle} onClick={signIn}>Sign In</Button>
          <Button variant="outline-primary" onClick={signUp} style={buttonStyle}>Sign Up</Button>
        </div>
      );
    } else {
      return (<Button variant="outline-danger" style={buttonStyle} onClick={props.signoutUser}>Log Out </Button>);
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand onClick={goHome} style={{ cursor: 'pointer' }}>Grocery Tracker</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={goProducts} style={{ cursor: 'pointer' }}>My Products</Nav.Link>
          <Nav.Link onClick={goStores} style={{ cursor: 'pointer' }}>My Stores</Nav.Link>
        </Nav>
        {renderButtons()}
        {/* <Button variant="outline-success" style={buttonStyle} onClick={goNewPost}>New Post</Button> */}
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = (reduxState) => {
  return {
    authenticated: reduxState.auth.authenticated,
  };
};

export default withRouter(connect(mapStateToProps, { signoutUser })(NavBar));
