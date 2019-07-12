import React, { Component } from 'react';
import Header from './Header';
import { 
  BrowserRouter as Router, 
  Route, 
  Switch,
  Redirect,
  withRouter 
} from 'react-router-dom';
import netlifyIdentity from 'netlify-identity-widget';
import Protected from './Protected';
import Public from './Public';
import Form from './Form';
import PublishedList from './PublishedList';
import DraftList from './DraftList';
import errorPage from './404';



class App extends Component {

  render() {
    return (
      <div className="App container">
      <Router>
        <Header />
        <AuthButton />
        <Switch>
          {/* <Route exact path="/" component={PublishedList} />
          <Route exact path="/drafts" component={DraftList} /> */}
          <Route path="/public" component={Public} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/protected" component={Protected} />
          {/* <Route exact path="/new" component={Form} />
          <Route component={errorPage} /> */}
        </Switch>
        
          
        </Router>
        </div>
    )
  }
}

const netlifyAuth = {
  isAuthenticated: false,
  user: null,
  authenticate(callback) {
    this.isAuthenticated = true;
    netlifyIdentity.open();
    netlifyIdentity.on('login', user => {
      this.user = user;
      callback(user);
    });
  },
  signout(callback) {
    this.isAuthenticated = false;
    netlifyIdentity.logout();
    netlifyIdentity.on('logout', () => {
      this.user = null;
      callback();
    });
  }
};

const AuthButton = withRouter(
  ({ history }) =>
    netlifyAuth.isAuthenticated ? (
      <p>
        Welcome!{' '}
        <button
          onClick={() => {
            netlifyAuth.signout(() => history.push('/'));
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    )
);

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        netlifyAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

class Login extends Component {
  state = { redirectToReferrer: false };

  login = () => {
    netlifyAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };

  render() {
    let { from } = this.props.location.state || { from: { pathname: '/' } };
    let { redirectToReferrer } = this.state;

    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}

export default App;
