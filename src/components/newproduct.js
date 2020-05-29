// some imports
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  Container, Form, Button,
} from 'react-bootstrap';
import { createProduct, fetchStores } from '../actions/index';


class NewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedStores: new Set() };
  }

  componentDidMount() {
    this.props.fetchStores();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.elements['form-name'].value;
    const days = event.target.elements['form-days'].value;
    const stock = event.target.elements['form-stock'].value;

    // console.log(this.state.selectedStores);
    const prod = { ProductName: name, ProductDaysPerWidget: days, remainingDays: stock };
    const stores = Array.from(this.state.selectedStores);

    this.props.createProduct(prod, stores, this.props.history);
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

    render() {
      const storeOptions = this.props.stores.map((store) => {
        console.log(store);
        return (
          <Form.Check key={store.StoreID} type="checkbox" value={store.StoreID} label={store.StoreName} onChange={this.handleChange} />
        );
      });
      return (
        <Container className="newpost-container">
          <Form onSubmit={(e) => this.handleSubmit(e)}>
            <Form.Group controlId="form-name">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" placeholder="Enter product name" />
            </Form.Group>
            <Form.Group controlId="form-stock">
              <Form.Label>Currently Stocked (in days)</Form.Label>
              <Form.Control type="text" placeholder="How many days worth of this do you currently have?" />
            </Form.Group>
            <Form.Group controlId="form-days">
              <Form.Label>Days per Widget</Form.Label>
              <Form.Control type="number" placeholder="Enter how many days does this product last per widget" />
            </Form.Group>
            <Form.Group controlId="form-stores">
              Stores
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

export default connect(mapStateToProps, { createProduct, fetchStores })(NewProduct);
