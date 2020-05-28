// some imports
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  Container, Form, Button,
} from 'react-bootstrap';
import { createStore } from '../actions/index';


class NewStore extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.elements['form-name'].value;
    const address = event.target.elements['form-address'].value;
    console.log(`Adding store with name: ${name}and address: ${address}`);
  }

  render() {
    return (
      <Container className="newpost-container">
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <Form.Group controlId="form-name">
            <Form.Label>Store Name</Form.Label>
            <Form.Control type="text" placeholder="Enter store name" />
          </Form.Group>
          <Form.Group controlId="form-address">
            <Form.Label>Addresss</Form.Label>
            <Form.Control type="text" placeholder="Enter the address" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

// function mapStateToProps(reduxState) {
//   return {
//     stores: reduxState.stores.all,
//   };
// }

export default connect(null, { createStore })(NewStore);
