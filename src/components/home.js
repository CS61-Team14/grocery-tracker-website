// some imports
// import { connect } from 'react-redux';
import React, { Component } from 'react';
// import {
//   Card, CardColumns, Container,
// } from 'react-bootstrap';
// import { fetchPost, fetchPosts } from '../actions/index';

class Home extends Component {
  componentDidMount() {
    // this.props.fetchPosts();
  }

  render() {
    return (<h1>Shopping List: </h1>);
  }
}


// function mapStateToProps(reduxState) {
//   return {
//     posts: reduxState.posts.all,
//   };
// }

// export default connect(null, null)(Home);
export default Home;
