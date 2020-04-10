import React, { forwardRef } from 'react';
import './card.scss';

export default forwardRef(({
  name, text, setName, type, imageUrl,
}, ref) => (
  <div className="card" ref={ref}>
    <div className="info">
      <dl className="attributes">
        <dt>Set:</dt>
        <dd>{setName}</dd>
        <dt>Type:</dt>
        <dd>{type}</dd>
      </dl>
      <p>{text}</p>
    </div>
    <div className="image-wrapper">
      <img className="image" src={imageUrl} alt={`${name} playing card`} />
    </div>
    <h1>{name}</h1>
  </div>
));
