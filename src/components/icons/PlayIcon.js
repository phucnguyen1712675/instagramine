import * as React from 'react';

function PlayIcon(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="prefix__a"
        style={{
          maskType: 'alpha',
        }}
        maskUnits="userSpaceOnUse"
        x={6}
        y={5}
        width={12}
        height={14}
      >
        <path
          d="M6.927 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 000-1.69l-8.14-5.17a.998.998 0 00-1.54.84z"
          fill="#000"
        />
      </mask>
      <g mask="url(#prefix__a)">
        <path fill="currentColor" d="M0 0h24v24H0z" />
      </g>
    </svg>
  );
}

export default PlayIcon;
