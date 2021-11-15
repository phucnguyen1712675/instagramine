import * as React from 'react';

function ExploreIcon(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx={20.75}
        cy={12.5}
        r={12.5}
        fill="url(#prefix__paint0_linear_29:262)"
      />
      <g filter="url(#prefix__filter0_bd_29:262)">
        <circle
          cx={15.75}
          cy={16.25}
          r={13.75}
          fill="url(#prefix__paint1_linear_29:262)"
          fillOpacity={0.6}
        />
        <circle
          cx={15.75}
          cy={16.25}
          r={13.75}
          stroke="url(#prefix__paint2_linear_29:262)"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <path
        d="M20.73 11.398a.5.5 0 00-.699-.646l-6.2 3.473a1 1 0 00-.406.425l-3.219 6.437a.5.5 0 00.685.664l6.44-3.468a1 1 0 00.434-.461l2.965-6.424z"
        fill="url(#prefix__paint3_linear_29:262)"
      />
      <defs>
        <linearGradient
          id="prefix__paint0_linear_29:262"
          x1={36.539}
          y1={-6.579}
          x2={6.275}
          y2={30.824}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFD400" />
          <stop offset={1} stopColor="#F3C813" />
        </linearGradient>
        <linearGradient
          id="prefix__paint1_linear_29:262"
          x1={43.25}
          y1={-6.875}
          x2={8.923}
          y2={29.235}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={0.725} stopColor="#FFC700" />
        </linearGradient>
        <linearGradient
          id="prefix__paint2_linear_29:262"
          x1={27.972}
          y1={5.938}
          x2={4.797}
          y2={32.445}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#fff" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          id="prefix__paint3_linear_29:262"
          x1={18.25}
          y1={14.375}
          x2={9.5}
          y2={22.5}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#fff" />
        </linearGradient>
        <filter
          id="prefix__filter0_bd_29:262"
          x={-2.5}
          y={-2}
          width={37.5}
          height={36.5}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImage" stdDeviation={2} />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_29:262"
          />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx={2} dy={1} />
          <feGaussianBlur stdDeviation={1.5} />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 1 0 0 0 0 0.0999999 0 0 0 0.1 0" />
          <feBlend
            in2="effect1_backgroundBlur_29:262"
            result="effect2_dropShadow_29:262"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect2_dropShadow_29:262"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default ExploreIcon;
