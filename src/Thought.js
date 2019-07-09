import React from 'react';
import moment from 'moment';

const Thought = (props) => {
  return (
      <li className="collection-item">
        <div>
          <span>{props.text}</span>
          <span className="pink-text secondary-content">{moment(props.date).fromNow()}</span>
        </div>
        
        
      </li>
  )
}

export default Thought