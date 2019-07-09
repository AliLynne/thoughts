import React, { Component } from 'react';
import Header from './Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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

        <Switch>
          <Route exact path="/" component={PublishedList} />
          <Route exact path="/drafts" component={DraftList} />
          <Route exact path="/new" component={Form} />
          <Route component={errorPage} />
        </Switch>
        
          
        </Router>
        </div>
    )
  }
}

export default App;
