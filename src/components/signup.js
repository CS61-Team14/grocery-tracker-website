import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  Container, Form, Button,
} from 'react-bootstrap';
import { signupUser } from '../actions/index';


class SignUp extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.elements['form-email'].value;
    const password = event.target.elements['form-password'].value;
    const username = event.target.elements['form-username'].value;

    const user = {
      email, password, username,
    };
    this.props.signupUser(user, this.props.history);
  }

  render() {
    // Code based on form example from react bootstrap website
    return (
      <Container className="newpost-container">
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <Form.Group controlId="form-email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="form-username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" placeholder="Enter username" />
          </Form.Group>
          <Form.Group controlId="form-password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default connect(null, { signupUser })(SignUp);
