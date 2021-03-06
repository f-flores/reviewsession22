import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import axios from 'axios';
import API from './utils/API';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Main from './screens/Main';
import Logout from './screens/Logout';
import Navbar from './components/Navbar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      email: '',
    };
    this.loginCheck = this.loginCheck.bind(this);
    this.source = {};
  }

  componentDidMount() {
    this.source = axios.CancelToken.source();
    this.loginCheck(this.source);
  }

  componentWillUnmount = () => API.cancelRequest(this.source);

  // receiving login result from Login component
  getLoginResult = (obj, redirPath) => {
    console.log(`in getLoginResult: ${JSON.stringify(obj)}`);
    this.setState(obj);
    this.redirPath = redirPath;
  }

  getLogoutResult = obj => this.setState(obj);

  loginCheck = (source) => {
    API
      .loginCheck(source)
      .then((res) => {
        console.log(`App.jsx loginCheck res.data: ${JSON.stringify(res.data)}`);
        if (res.data.isLoggedIn) {
          this.setState({
            isLoggedIn: res.data.isLoggedIn,
            email: res.data.email,
          });
        }
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('Request canceled', err);
        } else {
          console.log(err);
        }
      });
  }

  // eslint-disable-next-line no-shadow
  PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) => {
        console.log(`in PrivateRoute: ${JSON.stringify(this.state)}`);
        const { isLoggedIn, email } = this.state;
        if (isLoggedIn) {
          return (
            <Component
              email={email}
              isLoggedIn={isLoggedIn}
              {...props}
            />
          );
        }
        return <Redirect to="/login" />;
      }}
    />
  );


  render() {
    const { isLoggedIn, email } = this.state;
    console.log(`App.jsx render -- ${JSON.stringify(this.state)}`);
    return (
      <Router>
        <div>
          <Navbar
            isLoggedIn={isLoggedIn}
            email={email}
          />
          <Switch>
            <this.PrivateRoute exact path="/" component={Main} />
            <Route
              exact
              path="/login"
              render={props => (
                <Login
                  {...props}
                  isLoggedIn={isLoggedIn}
                  email={email}
                  loginResult={this.getLoginResult}
                />
              )}
            />
            <Route exact path="/signup" component={Signup} />
            <Route
              exact
              path="/logout"
              render={props => (
                <Logout
                  {...props}
                  logoutResult={this.getLogoutResult}
                />
              )}
            />
            <Route component={Main} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
