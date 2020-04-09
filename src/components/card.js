import React from 'react';
import './card.scss';

export default function Card({ name, text, imageUrl }) {
  return (
    <div className="card">
      <div className="fields">
        <h1>{name}</h1>
        <p>{text}</p>
      </div>
      <div className="image-wrapper">
        <img className="main-image" src={imageUrl} alt={`${name} playing card`} />
      </div>
    </div>
  );
}
