import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import API from '../utils/API';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      example: '',
    };
    this.source = {};
  }

  render() {
    const { isLoggedIn, email } = this.props;

    if (!isLoggedIn) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="container">
        <div className="justify-content-center">
          <h2 className="text-center">
            Main page
            {' '}
            {email}
          </h2>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
};

export default Main;
