import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../utils/API';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      email: '',
      password: '',
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  // Method to handle user login, should redirect to main page when done
  login = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    API
      .login({ email, password })
      .then((res) => {
        console.log(res.data);
        this.setState({ isLoggedIn: res.data });
      })
      .catch(err => console.log(err.response));
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
              </label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={this.handleInputChange}
                className="form-control"
                placeholder="email"
              />
              <small id="emailHelp" className="form-text text-muted">Enter your email</small>
            </div>
            <div className="form-group">
              <label htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={this.handleInputChange}
                className="form-control"
                placeholder="Password"
              />
            </div>

            <button type="submit" className="btn btn-success" onClick={this.login}>Login</button>
          </form>

        </div>
      </div>
    );
  }
}

export default Login;
