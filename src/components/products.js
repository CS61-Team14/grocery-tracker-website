/* eslint-disable react/style-prop-object */
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  Table, Container, Button, ButtonGroup,
} from 'react-bootstrap';
import { fetchProducts, deleteProduct } from '../actions/index';

class Products extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

    handleDelete = (id) => {
      this.props.deleteProduct(id);
    }

    render() {
      const productItems = this.props.products.map((prod) => {
        return (
          <tr key={prod.ProductID}>
            <td>{prod.ProductName}</td>
            <td>{prod.InventoryRemainingDays}</td>
            <td>
              <ButtonGroup className="button-group" aria-label="First group">
                <Button variant="primary" styles={{ flex: 1 }}>  Edit  </Button>
                <Button variant="danger" onClick={() => { this.handleDelete(prod.ProductID); }} styles={{ flex: 1 }}>Delete</Button>
              </ButtonGroup>
            </td>
          </tr>
        );
      });
      return (
        <Container>
          <Button variant="success" className="button-add" onClick={() => { this.props.history.push('products/new'); }}> Add a Product </Button>
          <Table striped bordered hover className="table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Days Left</th>
                <th className="col-small">Actions</th>
              </tr>
            </thead>
            <tbody>
              {productItems}
            </tbody>
          </Table>
        </Container>
      );
    }
}


function mapStateToProps(reduxState) {
  return {
    products: reduxState.products.all,
    // stores: reduxState.stores.all,
  };
}

export default connect(mapStateToProps, { fetchProducts, deleteProduct })(Products);
// export default Products;
