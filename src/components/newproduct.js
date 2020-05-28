// some imports
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  Container, Form, Button,
} from 'react-bootstrap';
import { createProduct } from '../actions/index';


class NewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedStores: new Set() };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // const title = event.target.elements['form-name'].value;
    // // const tags = event.target.elements['form-days'].value;
    // const stores = event.target.elements['form-stores'].value;

    console.log(this.state.selectedStores);
    // const post = {
    //   title, tags, content, coverUrl,
    // };
    // this.props.createPost(post, this.props.history);
  }

    handleChange = (event) => {
      event.persist();
      this.setState((prevState) => {
        if (event.target.checked) {
          prevState.selectedStores.add(event.target.value);
        } else {
          prevState.selectedStores.delete(event.target.value);
        }
        return ({ selectedStores: prevState.selectedStores });
      });
    }

    // renderStores = () => {
    //   console.log('In render stores');
    // }

    render() {
      const storeOptions = this.props.stores.map((store) => {
        console.log(store);
        return (
          <Form.Check type="checkbox" value={store.id} label={store.name} onChange={this.handleChange} />
        );
      });
      return (
        <Container className="newpost-container">
          <Form onSubmit={(e) => this.handleSubmit(e)}>
            <Form.Group controlId="form-name">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" placeholder="Enter product name" />
            </Form.Group>
            <Form.Group controlId="form-days">
              <Form.Label>Days per Widger</Form.Label>
              <Form.Control type="number" placeholder="Enter how many days does this product last per widget" />
            </Form.Group>
            <Form.Group controlId="form-stores">
              {storeOptions}
              {/* <Form.Check type="checkbox" value="val1" label="Store 1" onChange={this.handleChange} />
              <Form.Check type="checkbox" value="val2" label="Store 2" onChange={this.handleChange} />
              <Form.Check type="checkbox" value="val3" label="Store 3" onChange={this.handleChange} /> */}
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      );
    }
}

function mapStateToProps(reduxState) {
  return {
    stores: reduxState.stores.all,
  };
}

export default connect(mapStateToProps, { createProduct })(NewProduct);
