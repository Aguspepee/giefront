import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

export const Logo = styled((props) => {
  const { variant, ...other } = props;

  const color = variant === 'light' ? '#C1C4D6' : '#5048E5';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 944.434 208.8"
      xmlSpace="preserve"
    >
      <defs>
        <clipPath id="clipPath28" clipPathUnits="userSpaceOnUse">
          <path
            d="M662.725 613.981l-23.248-23.302-13.955-13.955c-26.247-26.247-26.247-69.096 0-95.344 26.235-26.234 69.097-26.247 95.345 0l18.641 18.642c25.613 25.612 7.659 70.069-29.03 70.069-10.509 0-21.046-3.998-29.044-11.996l-18.642-18.641c-5.741-5.741-5.741-15.063 0-20.804 5.742-5.741 15.063-5.741 20.805 0l13.196 13.198-7.212 7.214 37.081 6.173-6.187-37.067-7.213 7.213-13.199-13.198c-23.559-23.559-64.841-7.295-64.841 26.883 0 9.753 3.688 19.493 11.077 26.882l18.277 18.277-.054.054 18.952 18.952.027-.027c5.741 5.741 5.741 15.063 0 20.804a14.602 14.602 0 01-10.361 4.292 14.69 14.69 0 01-10.415-4.319"
            className="svg-elem-1"
          ></path>
        </clipPath>
        <linearGradient
          id="linearGradient38"
          x1="0"
          x2="1"
          y1="0"
          y2="0"
          gradientTransform="matrix(145.69144 0 0 -145.69144 605.837 540)"
          gradientUnits="userSpaceOnUse"
          spreadMethod="pad"
        >
          <stop offset="0" stopColor="#04d8dc" stopOpacity="1"></stop>
          <stop offset="1" stopColor="#01f4a0" stopOpacity="1"></stop>
        </linearGradient>
        <clipPath id="clipPath48" clipPathUnits="userSpaceOnUse">
          <path d="M0 1080h1920V0H0z" className="svg-elem-2"></path>
        </clipPath>
      </defs>
      <g transform="matrix(1.33333 0 0 -1.33333 -807.782 824.4)">
        <g clipPath="url(#clipPath28)">
          <path
            fill='url("#linearGradient38")'
            stroke="none"
            d="M662.725 613.981l-23.248-23.302-13.955-13.955c-26.247-26.247-26.247-69.096 0-95.344 26.235-26.234 69.097-26.247 95.345 0l18.641 18.642c25.613 25.612 7.659 70.069-29.03 70.069-10.509 0-21.046-3.998-29.044-11.996l-18.642-18.641c-5.741-5.741-5.741-15.063 0-20.804 5.742-5.741 15.063-5.741 20.805 0l13.196 13.198-7.212 7.214 37.081 6.173-6.187-37.067-7.213 7.213-13.199-13.198c-23.559-23.559-64.841-7.295-64.841 26.883 0 9.753 3.688 19.493 11.077 26.882l18.277 18.277-.054.054 18.952 18.952.027-.027c5.741 5.741 5.741 15.063 0 20.804a14.602 14.602 0 01-10.361 4.292 14.69 14.69 0 01-10.415-4.319"
            className="svg-elem-3"
          ></path>
        </g>
        <g>
        </g>
      </g>
    </svg>
  );
})``;

Logo.defaultProps = {
  variant: 'primary'
};

Logo.propTypes = {
  variant: PropTypes.oneOf(['light', 'primary'])
};
