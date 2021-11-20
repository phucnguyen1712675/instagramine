import * as React from 'react';

function ThreeDotsIcon(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 18 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 2a2 2 0 11-4 0 2 2 0 014 0zm7 0a2 2 0 11-4 0 2 2 0 014 0zm5 2a2 2 0 100-4 2 2 0 000 4z"
        fill="currentColor"
      />
    </svg>
  );
}

export default ThreeDotsIcon;
