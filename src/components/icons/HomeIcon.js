import * as React from 'react';

function HomeIcon(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.893 10.923a.976.976 0 01.551-.654l10.684-4.71c.853-.376 1.862-.094 2.42.678l7 9.66c.179.248.239.562.164.854l-3.29 12.832a2.49 2.49 0 01-1.116 1.52 2.304 2.304 0 01-1.818.25L7.296 26.818a2.412 2.412 0 01-1.454-1.166 2.601 2.601 0 01-.24-1.9l3.291-12.83z"
        fill="url(#prefix__paint0_linear_29:252)"
      />
      <g filter="url(#prefix__filter0_bd_29:252)">
        <path
          d="M2 11.98a1 1 0 01.37-.777l9.418-7.655a2 2 0 012.523 0l9.419 7.655a1 1 0 01.37.776v13.636c0 .68-.26 1.333-.72 1.814a2.403 2.403 0 01-1.736.752H4.455c-.65 0-1.275-.27-1.736-.752A2.625 2.625 0 012 25.615V11.979z"
          fill="url(#prefix__paint1_linear_29:252)"
          fillOpacity={0.6}
        />
        <path
          d="M2 11.98a1 1 0 01.37-.777l9.418-7.655a2 2 0 012.523 0l9.419 7.655a1 1 0 01.37.776v13.636c0 .68-.26 1.333-.72 1.814a2.403 2.403 0 01-1.736.752H4.455c-.65 0-1.275-.27-1.736-.752A2.625 2.625 0 012 25.615V11.979z"
          stroke="url(#prefix__paint2_linear_29:252)"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <path
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.139 23.332h7.821"
      />
      <defs>
        <linearGradient
          id="prefix__paint0_linear_29:252"
          x1={26.536}
          y1={7.63}
          x2={7.189}
          y2={25.548}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF0028" />
          <stop offset={1} stopColor="#DE2442" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          id="prefix__paint1_linear_29:252"
          x1={19.802}
          y1={8.938}
          x2={1.191}
          y2={27.363}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF0029" />
          <stop offset={1} stopColor="#E5324F" />
        </linearGradient>
        <linearGradient
          id="prefix__paint2_linear_29:252"
          x1={22.871}
          y1={5.73}
          x2={1.056}
          y2={27.222}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#fff" stopOpacity={0} />
        </linearGradient>
        <filter
          id="prefix__filter0_bd_29:252"
          x={-2.5}
          y={-1.4}
          width={32.099}
          height={34.08}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImage" stdDeviation={2} />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_29:252"
          />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx={2} dy={1} />
          <feGaussianBlur stdDeviation={1.5} />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend
            in2="effect1_backgroundBlur_29:252"
            result="effect2_dropShadow_29:252"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect2_dropShadow_29:252"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default HomeIcon;
