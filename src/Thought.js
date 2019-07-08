import React from 'react';
import moment from 'moment';

const Thought = (props) => {
  return (
    <div>
      <li>
        <p>{props.text}</p>
        <p>{moment(props.date).format('MMMM Do, YYYY')} - {moment(props.date).fromNow()}</p>
      </li>
      
    </div>
  )
}

export default Thought