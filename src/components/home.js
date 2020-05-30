// some imports
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  Container, Table, // Button,
} from 'react-bootstrap';
import { fetchShoppingList } from '../actions/index';

class Home extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { curStore: '' };
  // }

  componentDidMount() {
    console.log('Calling fetch!!!');
    this.props.fetchShoppingList('all');
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
        // console.log('On else');
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
              </tr>
            </thead>
            <tbody>
              {group.map((item) => {
                return (
                  <tr key={`${item.StoreID}${item.ProductID}`}>
                    <td>{item.ProductName}</td>
                    <td>{item.InventoryRemainingDays}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>

      );
    });
    return tables;
    // const table = (
    // <Table striped bordered hover className="table">
    //   <thead>
    //     <tr>
    //       <th>Store Name</th>
    //       <th>Product Name</th>
    //       <th>Days Remaining</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {/* {shoppingItems} */}
    //   </tbody>
    // </Table>;
    // );
  }

  render() {
    // const shoppingItems = this.props.shoppingList.map((item) => {
    //   // if (this.state.curStore === '') this.state.curStore.set(item.StoreName);
    //   const bodyItems = (
    //     <>
    //       <tr key={`${item.ProductName}${item.StoreName}`}>
    //         <td>Helloooooo</td>
    //       </tr>
    //       <tr key={`${item.StoreName}${item.ProductName}`}>
    //         <td>{item.StoreName}</td>
    //         <td>{item.ProductName}</td>
    //         <td>{item.InventoryRemainingDays}</td>
    //       </tr>
    //     </>
    //   );
    //   // if (item === this.state.curStore) {

    //   // }
    //   return (bodyItems);
    // });
    return (
      // <h1>Shopping List: </h1>
      <Container>
        {this.renderTables()}
        {/* <Table striped bordered hover className="table">
          <thead>
            <tr>
              <th>Store Name</th>
              <th>Product Name</th>
              <th>Days Remaining</th>
            </tr>
          </thead>
          <tbody>
            {shoppingItems}
          </tbody>
        </Table> */}
      </Container>
    );
  }
}


function mapStateToProps(reduxState) {
  return {
    shoppingList: reduxState.shoppingList.all,
  };
}

// export default connect(null, null)(Home);
export default connect(mapStateToProps, { fetchShoppingList })(Home);
