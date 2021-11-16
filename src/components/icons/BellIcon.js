import * as React from 'react';

function BellIcon(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 23 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M14 20a4 4 0 11-8 0 4 4 0 018 0z" fill="#FFA000" />
      <g filter="url(#prefix__filter0_b_29_660)">
        <path
          d="M17.008 11.921c-3.39-.484-6.008-3.4-6.008-6.92 0-1.001.214-1.95.593-2.811A6.97 6.97 0 0010 2C6.14 2 3 5.14 3 9v2.788a6.705 6.705 0 01-2.388 5.133 1.752 1.752 0 001.138 3.08h16.5a1.752 1.752 0 001.128-3.089 6.696 6.696 0 01-2.37-4.99z"
          fill="#FF9901"
        />
      </g>
      <path d="M23 5a5 5 0 11-10 0 5 5 0 0110 0z" fill="#27D224" />
      <defs>
        <filter
          id="prefix__filter0_b_29_660"
          x={-4}
          y={-2}
          width={28}
          height={26}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImage" stdDeviation={2} />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_29_660"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_backgroundBlur_29_660"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default BellIcon;
