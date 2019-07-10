import React, { Component } from 'react';
import moment from 'moment';
import * as contentful from 'contentful-management';
import { Redirect } from 'react-router-dom';

const space = process.env.REACT_APP_CONTENTFUL_SPACE_ID
const accessToken = process.env.REACT_APP_CONTENT_MANAGEMENT_API_KEY
const environment = 'master'

class Thought extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: props.fields.text['en-US'],
      date: props.sys.createdAt,
      id: props.sys.id,
      redirect: false,
    }
    console.log(this.props)
  }

  client = contentful.createClient({
    accessToken: accessToken
  })

  handleClick = (id) => {
    this.client.getSpace(space)
      .then(space => space.getEnvironment(environment))
      .then(environment => environment.getEntry(id))
      .then(entry => entry.publish())
      .then(entry => console.log(`Entry ${entry.sys.id} published.`))
      .then(() => {
        this.setState({
          redirect: true
        })
      })
      .catch(console.error)
  }

  render() {
    if (this.state.redirect) return <Redirect to='/' />
    const needButton = this.props.buttonText
    let button

    if (needButton) {
      button = <button className="btn pink" onClick={() => this.handleClick(this.state.id)}>{this.props.buttonText}</button>
    } else {
      button = null
    }

    return (
      <li className="collection-item avatar">
          <blockquote className="truncate">{this.state.text}</blockquote>
          
            <p className="pink-text">{moment(this.state.date).fromNow()}</p>
          {button}
          
        
        
      </li>
  )
  }
  
}

export default Thought