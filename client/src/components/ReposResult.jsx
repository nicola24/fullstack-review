import React from 'react';
import OneRepo from './OneRepo.jsx';

const ReposResult = (props) => (
  <div>
    <h4> Repo Result Component </h4>
    {props.reposresult.map(x => <OneRepo nameUrl={x} />)}
  </div>
)

export default ReposResult;
