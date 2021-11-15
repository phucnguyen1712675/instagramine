import * as React from 'react';

function ActivityIcon(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 37 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M24.998 7.807c-2.573-1.534-5.736-.196-7.3 2.425-2.68 4.494-.322 8.41 2.38 13.933 6.144-.247 10.71-.035 13.39-4.53 1.563-2.62 1.236-6.04-1.336-7.574-1.656-.987-3.575-.863-4.46-.629-.216-.89-1.018-2.637-2.674-3.625z"
        fill="url(#prefix__paint0_linear_29:266)"
      />
      <g filter="url(#prefix__filter0_bd_29:266)">
        <path
          d="M5.827 8.838c-3.472 1.761-4.199 6.166-2.405 9.704 3.076 6.065 9.016 6.195 16.96 7.061 3.995-6.92 7.4-11.79 4.323-17.855-1.794-3.538-5.778-5.553-9.25-3.793-2.234 1.134-3.43 3.329-3.788 4.464-1.127-.382-3.605-.714-5.84.42z"
          fill="url(#prefix__paint1_linear_29:266)"
          fillOpacity={0.4}
        />
        <path
          d="M5.827 8.838c-3.472 1.761-4.199 6.166-2.405 9.704 3.076 6.065 9.016 6.195 16.96 7.061 3.995-6.92 7.4-11.79 4.323-17.855-1.794-3.538-5.778-5.553-9.25-3.793-2.234 1.134-3.43 3.329-3.788 4.464-1.127-.382-3.605-.714-5.84.42z"
          stroke="url(#prefix__paint2_linear_29:266)"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <linearGradient
          id="prefix__paint0_linear_29:266"
          x1={28.331}
          y1={8.939}
          x2={16.536}
          y2={23.45}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF6362" />
          <stop offset={1} stopColor="#FF9D94" />
        </linearGradient>
        <linearGradient
          id="prefix__paint1_linear_29:266"
          x1={19.58}
          y1={7.9}
          x2={14.753}
          y2={27.727}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF2E00" />
          <stop offset={1} stopColor="red" />
        </linearGradient>
        <linearGradient
          id="prefix__paint2_linear_29:266"
          x1={21.318}
          y1={4}
          x2={15.644}
          y2={32.188}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#fff" stopOpacity={0} />
        </linearGradient>
        <filter
          id="prefix__filter0_bd_29:266"
          x={-2.023}
          y={-1.196}
          width={33.418}
          height={31.299}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImage" stdDeviation={2} />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_29:266"
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
            in2="effect1_backgroundBlur_29:266"
            result="effect2_dropShadow_29:266"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect2_dropShadow_29:266"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default ActivityIcon;
