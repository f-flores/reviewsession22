import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import API from '../utils/API';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      email: '',
      password: '',
    };
    this.login = this.login.bind(this);
    this.source = {};
  }

  componentDidMount() {
    this.source = axios.CancelToken.source();
  }

  componentDidUpdate(prevProps) {
    const { isLoggedIn } = this.props;
    if (isLoggedIn !== prevProps.isLoggedIn) {
      this.changeLoggedInState(isLoggedIn);
    }
  }

  componentWillUnmount = () => API.cancelRequest(this.source);

  changeLoggedInState = currentValue => this.setState({ isLoggedIn: currentValue });

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  // Method to handle user login, should redirect to main page when done
  login = (e) => {
    const { email, password } = this.state;
    const { loginResult } = this.props;
    e.preventDefault();

    API
      .loginUser({ email, password }, this.source)
      .then((res) => {
        console.log(res.data);
        this.setState({ isLoggedIn: res.data.isLoggedIn });
        // ------------------------------------------
        // loginResult is callback function to parent
        // ------------------------------------------
        loginResult({
          email,
          isLoggedIn: res.data.isLoggedIn,
        }, '/');
      })
      .catch(err => console.log(JSON.stringify(err)));
  }

  render() {
    const { isLoggedIn, email, password } = this.state;

    // If user is logged in, take them to main page
    if (isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container my-5">
        <div className="row justify-content-center">
          <form>
            <h3>Login to MyApp</h3>
            <div className="form-group">
              <label htmlFor="email">
                Email
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={this.handleInputChange}
                  className="form-control"
                  placeholder="email"
                />
              </label>
              <small id="emailHelp" className="form-text text-muted">Enter your email</small>
            </div>
            <div className="form-group">
              <label htmlFor="password">
              Password
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleInputChange}
                  className="form-control"
                  placeholder="Password"
                />
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-success"
              onClick={this.login}
            >
              Login
            </button>
          </form>

        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginResult: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Login;
