import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  Table, Container, Button, ButtonGroup,
} from 'react-bootstrap';
import { fetchStores, deleteStore } from '../actions/index';

class Stores extends Component {
  componentDidMount() {
    // this.props.fetchStores();
  }

  render() {
    const storeItems = this.props.stores.map((store) => {
      return (
        <tr key={store.id}>
          <td>{store.name}</td>
          <td>{store.address}</td>
          <td>
            <ButtonGroup className="button-group" aria-label="First group">
              <Button variant="primary" styles={{ flex: 1 }}>  Edit  </Button>
              <Button variant="danger" onClick={() => { this.props.deleteStore(store.id); }} styles={{ flex: 1 }}>Delete</Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });
    return (


      <Container>
        <Button variant="success" className="button-add" onClick={() => { this.props.history.push('stores/new'); }}> Add a Store </Button>
        <Table striped bordered hover className="table">
          <thead>
            <tr>
              <th>Store Name</th>
              <th>Address</th>
              <th className="col-small">Actions</th>
            </tr>
          </thead>
          <tbody>
            {storeItems}
          </tbody>
        </Table>
      </Container>
    );
  }
}


function mapStateToProps(reduxState) {
  return {
    stores: reduxState.stores.all,
  };
}

export default connect(mapStateToProps, { fetchStores, deleteStore })(Stores);
// export default Products;
