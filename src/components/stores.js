import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  Table, Container, Button, ButtonGroup,
} from 'react-bootstrap';
import { fetchStores, deleteStore, setStore } from '../actions/index';

class Stores extends Component {
  componentDidMount() {
    this.props.fetchStores();
  }

  handleDelete = (id) => {
    this.props.deleteStore(id, this.props.history);
  }

  render() {
    const storeItems = this.props.stores.map((store) => {
      return (
        <tr key={store.StoreID}>
          <td>{store.StoreName}</td>
          <td>{store.StoreCity}</td>
          <td>{`${store.StoreStreetNum} ${store.StoreStreet}`}</td>
          <td>{store.StoreZIP}</td>
          <td>
            <ButtonGroup className="button-group" aria-label="First group">
              <Button variant="primary" onClick={() => { this.props.setStore(store); this.props.history.push('stores/edit'); }} styles={{ flex: 1 }}>  Edit  </Button>
              {/* <Button variant="danger" onClick={() => { this.props.deleteStore(store.StoreID); }} styles={{ flex: 1 }}>{store.StoreID}</Button> */}
              <Button variant="danger" onClick={() => { this.handleDelete(store.StoreID); }} styles={{ flex: 1 }}>Delete</Button>

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
              <th>Name</th>
              <th>City</th>
              <th>Street Address</th>
              <th>Zip Code</th>
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

export default connect(mapStateToProps, { fetchStores, deleteStore, setStore })(Stores);
