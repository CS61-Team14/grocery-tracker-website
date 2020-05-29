// some imports
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  Container, Form, Button,
} from 'react-bootstrap';
import { updateStore } from '../actions/index';


class EditStore extends Component {
 handleSubmit = (event) => {
   event.preventDefault();
   const name = event.target.elements['form-name'].value;
   const street = event.target.elements['form-street'].value;
   const streetnum = event.target.elements['form-street-num'].value;
   const zip = event.target.elements['form-zip'].value;
   const city = event.target.elements['form-city'].value;
   // console.log(`Adding store with name: ${name}and address: ${address}`);
   const store = {
     StoreID: this.props.store.StoreID, StoreName: name, StoreStreetNum: streetnum, StoreStreet: street, StoreCity: city, StoreZIP: zip,
   };
   this.props.updateStore(store, this.props.history);
 }

 render() {
   return (
     <Container className="newpost-container">
       <Form onSubmit={(e) => this.handleSubmit(e)}>
         <Form.Group controlId="form-name">
           <Form.Label>Store Name</Form.Label>
           <Form.Control type="text" defaultValue={this.props.store.StoreName} />
         </Form.Group>
         <Form.Group controlId="form-city">
           <Form.Label>City</Form.Label>
           <Form.Control type="text" defaultValue={this.props.store.StoreCity} />
         </Form.Group>
         <Form.Group controlId="form-street">
           <Form.Label>Street Name</Form.Label>
           <Form.Control type="text" defaultValue={this.props.store.StoreStreet} />
         </Form.Group>
         <Form.Group controlId="form-street-num">
           <Form.Label>Street Number</Form.Label>
           <Form.Control type="text" pattern="\d*" maxLength="10" defaultValue={this.props.store.StoreStreetNum} />
         </Form.Group>
         <Form.Group controlId="form-zip">
           <Form.Label>Zip Code</Form.Label>
           <Form.Control type="text" pattern="\d*" maxLength="5" defaultValue={this.props.store.StoreZIP} />
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
    store: reduxState.stores.current,
  };
}

export default connect(mapStateToProps, { updateStore })(EditStore);
