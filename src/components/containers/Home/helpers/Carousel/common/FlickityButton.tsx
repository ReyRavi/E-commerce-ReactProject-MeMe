import React from 'react';
import {FlickityNextIcon, FlickityPrevIcon} from './FlickityIcons';

interface IProps {
  currentIndex: number;
  prev: () => void;
  next: () => void;
  show: number;
  length: number;
}

export const FlickityButton: React.FC<IProps> = (props: IProps) => {
  const {currentIndex, prev, next, show, length} = props;
  return (
    <React.Fragment>
      {currentIndex > 0 && (
        <button
          className="flickity-prev-next-button previous"
          type="button"
          disabled={false}
          aria-label="previous"
          onClick={prev}
        >
          <FlickityPrevIcon />
        </button>
      )}

      {currentIndex < length - show && (
        <button
          className="flickity-prev-next-button next"
          type="button"
          aria-label="next"
          onClick={next}
        >
          <FlickityNextIcon />
        </button>
      )}
    </React.Fragment>
  );
};
