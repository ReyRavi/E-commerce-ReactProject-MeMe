import React from 'react';

export const FlickityPrevIcon = () => {
  return (
    <svg viewBox="0 0 100 100">
      <path
        d="M 20,50 L 60,90 L 60,85 L 25,50  L 60,15 L 60,10 Z"
        className="arrow"
      ></path>
    </svg>
  );
};

export const FlickityNextIcon = () => {
  return (
    <svg viewBox="0 0 100 100">
      <path
        d="M 20,50 L 60,90 L 60,85 L 25,50  L 60,15 L 60,10 Z"
        className="arrow"
        transform="translate(100, 100) rotate(180) "
      ></path>
    </svg>
  );
};
