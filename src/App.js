import React, { Component } from 'react';
import Header from './Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Form from './Form';
import List from './List';



class App extends Component {

  render() {
    return (
      <div className="App container">
      <Router>
        <Header />

        <Route exact path="/" component={List} />
        <Route exact path="/new" component={Form} />
          
        </Router>
        </div>
    )
  }
}

export default App;
