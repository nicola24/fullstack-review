import React from 'react';

const OneRepo = (props) => (
  <div>
    <ul>
      <li>
        <p>{props.nameUrl.ownerLogin}:</p>
        <a href={props.nameUrl.url}>{props.nameUrl.url}</a>
      </li>
    </ul>
  </div>
)

export default OneRepo;
