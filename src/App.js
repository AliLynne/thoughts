import React, { Component } from 'react';
import * as contentful from 'contentful';
import Thought from './Thought';

const space = process.env.REACT_APP_CONTENTFUL_SPACE_ID
const accessToken = process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN

class App extends Component {

  state = {
    thoughts: []
  }

  client = contentful.createClient({
    space: space,
    accessToken: accessToken
  })

  

  componentDidMount() {
    this.fetchThoughts().then(this.setThoughts)
  }

  fetchThoughts = () => this.client.getEntries({
    select: 'sys.createdAt,sys.id,fields',
    order: 'sys.createdAt'
  })

  setThoughts = response => {
    this.setState({
      thoughts: response.items
    })
  }
  

  render() {
    return (
      <div className="App">
        <ul>
          {this.state.thoughts.map(({fields, sys}) =>
            <Thought key={sys.id} date={sys.createdAt} text={fields.text} />
          )}
        </ul>
      </div>
    )
  }
}

export default App;
