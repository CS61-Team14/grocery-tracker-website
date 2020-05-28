/* eslint-disable react/style-prop-object */
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  Table, Container, Button, ButtonGroup,
} from 'react-bootstrap';
// import { fetchProducts } from '../actions/index';

class Products extends Component {
  componentDidMount() {
    // this.props.fetchProducts();
  }

  //   openPost = (route, id) => {
  //     this.props.fetchPost(id);
  //     this.props.history.push(route);
  //   }

  //   renderAuthor = (post) => {
  //     if (post.author) {
  //       console.log(JSON.stringify(post.author));
  //       return post.author.username;
  //     } else {
  //       return 'loading';
  //     }
  //   }

  render() {
    // const postItems = this.props.posts.map((post) => {
    //   const route = `/posts/${post._id}`;
    //   return (
    //     <Card className="post-list-item" onClick={() => { this.openPost(route, post._id); }} key={post._id}>
    //       <Card.Img variant="top" src={post.coverUrl} />
    //       <Card.Body>
    //         <Card.Title>{post.title}</Card.Title>
    //         <Card.Text>
    //           {post.tags}
    //         </Card.Text>
    //       </Card.Body>
    //       <Card.Footer>
    //         Author: {this.renderAuthor(post)}
    //       </Card.Footer>
    //     </Card>
    //   );
    // });
    const productItems = this.props.products.map((prod) => {
      return (
        <tr key={prod.id}>
          <td>{prod.ProductName}</td>
          <td>{prod.DaysLeft}</td>
          <td>
            <ButtonGroup className="button-group" aria-label="First group">
              <Button variant="primary" styles={{ flex: 1 }}>  Edit  </Button>
              <Button variant="danger" styles={{ flex: 1 }}>Delete</Button>
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
    stores: reduxState.stores.all,
  };
}

export default connect(mapStateToProps, null)(Products);
// export default Products;
