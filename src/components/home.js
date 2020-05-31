/* eslint-disable radix */
// some imports
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  Container, Table, Form, Button, // Row, Col, // Button
} from 'react-bootstrap';
import { fetchShoppingList, buyStuff } from '../actions/index';

class Home extends Component {
  componentDidMount() {
    console.log('Calling fetch!!!');
    this.props.fetchShoppingList('all');
  }

  handleBuy = () => {
    // eslint-disable-next-line array-callback-return
    const forms = document.getElementsByClassName('form-buy'); // .forEach((form) => {
    const toBuy = {};
    for (let i = 0; i < forms.length; i += 1) {
      const prod = JSON.parse(forms[i].elements['form-check'].value);
      const quantity = parseInt(forms[i].elements['form-quantity'].value);
      const days = parseInt(prod.DaysPerWidget) * quantity * (forms[i].elements['form-check'].checked ? 1 : 0);
      if (!(prod.ProductID in toBuy)) {
        toBuy[prod.ProductID] = days;
      } else {
        toBuy[prod.ProductID] += days;
      }
    }
    console.log(toBuy);
    const products = [];
    // eslint-disable-next-line guard-for-in
    for (const id in toBuy) {
      const prod = { ProductID: id, DaysBought: toBuy[id] };
      products.push(prod);
    }
    this.props.buyStuff(products);
  }

  renderTables = () => {
    const list = this.props.shoppingList;
    if (list.length < 1) {
      return (<div />);
    }

    let headStore = list[0];
    let curGroup = [headStore];
    const groups = [curGroup];

    for (let i = 1; i < list.length; i += 1) {
      const curStore = list[i];
      if (curStore.StoreID === headStore.StoreID) {
        curGroup.push(curStore);
      } else {
        curGroup = [curStore];
        headStore = curStore;
        groups.push(curGroup);
      }
    }
    const tables = groups.map((group) => {
      return (
        <div>
          <h1> {group[0].StoreName} </h1>
          <Table striped bordered hover className="table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Days Remaining</th>
                <th className="col-small">Bought?</th>
              </tr>
            </thead>
            <tbody>
              {group.map((item) => {
                return (
                  <tr key={`${item.StoreID}${item.ProductID}`}>
                    <td>{item.ProductName}</td>
                    <td>{item.InventoryRemainingDays}</td>
                    <td>
                      <Form className="form-buy" id={`buy-${item.ProductID}-at-${item.StoreID}`} onChange={this.handleChange}>
                        <Form.Group controlId="form-quantity">
                          <Form.Control type="number" min="1" onKeyDown={() => { return false; }} className="quantity-input" max="999" defaultValue="1" />
                        </Form.Group>
                        <Form.Group controlId="form-check">
                          <Form.Check inline value={`{ "ProductID" : ${item.ProductID}, "DaysPerWidget" : ${item.ProductDaysPerWidget} }`} size="lg" className="buy-check" />
                        </Form.Group>

                      </Form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      );
    });
    return tables;
  }

  render() {
    return (
      // <h1>Shopping List: </h1>
      <Container>
        <Button variant="success" className="button-add" onClick={this.handleBuy}> Buy Selected </Button>
        {this.renderTables()}
      </Container>
    );
  }
}


function mapStateToProps(reduxState) {
  return {
    shoppingList: reduxState.shoppingList.all,
  };
}

export default connect(mapStateToProps, { fetchShoppingList, buyStuff })(Home);
