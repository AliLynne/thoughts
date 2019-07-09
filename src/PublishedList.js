import React, { Component } from 'react'
import * as contentful from 'contentful-management';
import Thought from './Thought';

const space = process.env.REACT_APP_CONTENTFUL_SPACE_ID
const accessToken = process.env.REACT_APP_CONTENT_MANAGEMENT_API_KEY
const environment = 'master'

export default class List extends Component {
  state = {
    thoughts: []
  }

  client = contentful.createClient({
    accessToken: accessToken,
  })

  componentDidMount() {
    this.fetchThoughts()
  }

  fetchThoughts = () => {
    this.client.getSpace(space)
      .then(space => space.getEnvironment(environment))
      .then(environment => environment.getEntries({
        'content_type': 'thought',
      }))
      .then(response => {
        this.setState({
          thoughts: response.items
        })
      })
  }

  setThoughts = response => {
    this.setState({
      thoughts: response.items
    })
  }

  render() {
    return (
        <ul className="collection">
            {this.state.thoughts.map(({fields, sys}) =>
              <Thought key={sys.id} sys={sys} fields={fields}/>
            )}
          </ul>
    )
  }
}