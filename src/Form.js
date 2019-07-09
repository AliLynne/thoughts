import React, { Component } from 'react';
import * as contentful from 'contentful-management';
import { Redirect } from 'react-router-dom';

const space = process.env.REACT_APP_CONTENTFUL_SPACE_ID
const accessToken = process.env.REACT_APP_CONTENT_MANAGEMENT_API_KEY




export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      redirect: false,
    };
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const client = contentful.createClient({
      // This is the access token for this space. Normally you get the token in the Contentful web app
      accessToken: accessToken
    })
    client.getSpace(space)
      .then(space => space.getEnvironment('master'))
      .then(env => env.createEntry('thought', {
        fields: {
          text: {
            'en-US': this.state.value
          }
        }
      }))
      .then(entry => console.log(entry))
      .then(() => {
        this.setState({
          redirect: true
        })
      })
      .catch(console.error)
  }

  render() {
    if (this.state.redirect) return <Redirect to='/' />
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Thought:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Save" />
      </form>
    );
  }
}
