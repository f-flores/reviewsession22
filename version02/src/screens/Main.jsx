import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../utils/API';

class Main extends Component {
  state = {
    isLoggedIn: false,
    email: '',
  }

  // Check login status on load
  componentDidMount() {
    this.loginCheck();
  }

  // Check login status
  loginCheck = () => {
    API
      .loginCheck()
      .then(res => this.setState({
        isLoggedIn: res.data.isLoggedIn, email: res.data.email,
      }))
      .catch((err) => {
        console.log(err);
        this.setState({ isLoggedIn: false });
      });
  }

  render() {
    const { isLoggedIn, email } = this.state;
    // If user isn't logged in, don't let them see this page
    if (!isLoggedIn) {
      return <Redirect to="/login" />;
    }

    return (
      <h1>
        You Made it to the main page
        {' '}
        {email}
!
      </h1>
    );
  }
}

export default Main;
