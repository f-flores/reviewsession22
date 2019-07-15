import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import API from '../utils/API';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      redirect: false,
      email: '',
      password: '',
    };
    this.source = {};
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  componentDidMount() {
    this.source = axios.CancelToken.source();
  }

  // cancels API requests
  componentWillUnmount = () => API.cancelRequest(this.source);

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleRedirect = () => this.setState({ redirect: true });

  // Method to register a new user
  register = (e) => {
    const { email, password } = this.state;
    e.preventDefault();
    API
      .register({ email, password }, this.source)
      .then((res) => {
        console.log(res.data);
        this.setState({ success: res.data });
      })
      .catch(err => console.log(JSON.stringify(err)));
  }

  render() {
    const {
      success,
      email,
      password,
      redirect,
    } = this.state;

    if (redirect) {
      return <Redirect to="/login" />;
    }

    // If Signup was a success, take user to the Login page
    if (success) {
      setTimeout(this.handleRedirect, 1500);
    }

    return (
      <div className="container my-5">
        <div className="row justify-content-center">
          <form>
            <h3>Sign Up!</h3>
            <div className="form-group">
              <label htmlFor="email">
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  value={email}
                  onChange={this.handleInputChange}
                  placeholder="Email"
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

            <button type="submit" className="btn btn-success" onClick={this.register}>Sign Up!</button>
            {
              success
              && (
              <p className="bg-info text-white font-weight-bold">
                Signup Successful! Will be redirected to Login Page shortly.
              </p>
              )
            }
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
