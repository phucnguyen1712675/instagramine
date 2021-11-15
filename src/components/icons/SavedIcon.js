import * as React from 'react';

function SavedIcon(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 30 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M25.375.145H12.543c-1.412 0-2.566 1.078-2.566 2.395v19.162l8.982-3.593 8.982 3.593V2.54c0-1.317-1.155-2.395-2.566-2.395z"
        fill="url(#prefix__paint0_linear_29:271)"
        fillOpacity={0.3}
      />
      <g filter="url(#prefix__filter0_bd_29:271)">
        <path
          d="M20.477 4.276H5.08C3.386 4.276 2 5.57 2 7.151v22.994l10.779-4.311 10.778 4.311V7.151c0-1.581-1.386-2.875-3.08-2.875z"
          fill="url(#prefix__paint1_linear_29:271)"
          fillOpacity={0.3}
        />
        <path
          d="M2 30.145h-.5a.5.5 0 00.686.464L2 30.145zm10.779-4.311l.185-.465a.5.5 0 00-.371 0l.186.465zm10.778 4.311l-.186.464a.5.5 0 00.686-.464h-.5zm-3.08-26.369H5.08v1h15.397v-1zm-15.397 0c-1.937 0-3.58 1.486-3.58 3.375h1c0-1.273 1.129-2.375 2.58-2.375v-1zM1.5 7.151v22.994h1V7.151h-1zm.686 23.458l10.778-4.311-.371-.929-10.779 4.312.372.928zm10.407-4.311l10.778 4.311.372-.928-10.779-4.312-.371.929zm11.464 3.847V7.151h-1v22.994h1zm0-22.994c0-1.89-1.643-3.375-3.58-3.375v1c1.451 0 2.58 1.102 2.58 2.375h1z"
          fill="url(#prefix__paint2_linear_29:271)"
        />
      </g>
      <defs>
        <linearGradient
          id="prefix__paint0_linear_29:271"
          x1={25.695}
          y1={-13.328}
          x2={9.675}
          y2={17.036}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F9705C" />
          <stop offset={1} stopColor="#FF1E00" />
        </linearGradient>
        <linearGradient
          id="prefix__paint1_linear_29:271"
          x1={20.863}
          y1={-11.891}
          x2={1.638}
          y2={24.546}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F9705C" />
          <stop offset={1} stopColor="#FF1E00" />
        </linearGradient>
        <linearGradient
          id="prefix__paint2_linear_29:271"
          x1={22.36}
          y1={7.51}
          x2={0.387}
          y2={28.453}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#fff" stopOpacity={0} />
        </linearGradient>
        <filter
          id="prefix__filter0_bd_29:271"
          x={-2.5}
          y={-0.224}
          width={31.557}
          height={34.869}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImage" stdDeviation={2} />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_29:271"
          />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx={2} dy={1} />
          <feGaussianBlur stdDeviation={1.5} />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend
            in2="effect1_backgroundBlur_29:271"
            result="effect2_dropShadow_29:271"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect2_dropShadow_29:271"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default SavedIcon;
