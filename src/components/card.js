import React, { forwardRef } from 'react';
import './card.scss';

// eslint-disable-next-line arrow-body-style
export default forwardRef(({ name, text, imageUrl }, ref) => {
  return (
    <div className="card" ref={ref}>
      <div className="fields">
        <h1>{name}</h1>
        <p>{text}</p>
      </div>
      <div className="image-wrapper">
        <img className="main-image" src={imageUrl} alt={`${name} playing card`} />
      </div>
    </div>
  );
});
