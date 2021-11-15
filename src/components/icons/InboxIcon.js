import * as React from 'react';

function InboxIcon(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 34 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.582 23.298a1.739 1.739 0 01-.615-.72 1.707 1.707 0 01.128-1.676l1.4-2.1c-.245-2.904.683-5.709 2.628-7.925 3.121-3.557 8.486-4.6 12.757-2.48 3.008 1.493 5.128 4.208 5.819 7.45a10.61 10.61 0 01-2.282 9.104c-3.102 3.684-8.527 4.798-12.9 2.651a10.83 10.83 0 01-4.28-3.78l-1.907-.245a1.75 1.75 0 01-.748-.279z"
        fill="url(#prefix__paint0_linear_29:256)"
      />
      <g filter="url(#prefix__filter0_bd_29:256)">
        <path
          d="M6.411 26.683c-.345 0-.689-.095-.995-.284a1.881 1.881 0 01-.898-1.611v-2.776c-1.98-2.509-2.836-5.642-2.412-8.858.68-5.159 4.92-9.387 10.082-10.054 3.635-.47 7.203.722 9.793 3.267 2.591 2.546 3.844 6.09 3.44 9.725-.586 5.264-4.837 9.595-10.107 10.298a11.734 11.734 0 01-6.175-.848l-1.88.94c-.269.134-.56.201-.848.201z"
          fill="url(#prefix__paint1_linear_29:256)"
          fillOpacity={0.6}
        />
        <path
          d="M12.295 3.933h.008m-5.892 22.75c-.345 0-.689-.095-.995-.284a1.881 1.881 0 01-.898-1.611v-2.776c-1.98-2.509-2.836-5.642-2.412-8.858.68-5.159 4.92-9.387 10.082-10.054 3.635-.47 7.203.722 9.793 3.267 2.591 2.546 3.844 6.09 3.44 9.725-.586 5.264-4.837 9.595-10.107 10.298a11.734 11.734 0 01-6.175-.848l-1.88.94c-.269.134-.56.201-.848.201z"
          stroke="url(#prefix__paint2_linear_29:256)"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <path
        d="M7.916 17.402l3.852-5.483c.16-.28.53-.357.789-.163l2.58 1.935a.537.537 0 00.6.031l3.141-2.221c.462-.277.998.22.758.701l-3.11 5.382a.537.537 0 01-.758.22l-3.445-2.066a.538.538 0 00-.517-.02l-3.183 2.43c-.476.239-.97-.285-.707-.746z"
        fill="#fff"
      />
      <defs>
        <linearGradient
          id="prefix__paint0_linear_29:256"
          x1={26.76}
          y1={14.842}
          x2={1.547}
          y2={30.958}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00F0FF" />
          <stop offset={1} stopColor="#0500FF" stopOpacity={0.1} />
        </linearGradient>
        <linearGradient
          id="prefix__paint1_linear_29:256"
          x1={20.927}
          y1={8.921}
          x2={-23.313}
          y2={58.448}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00F0FF" />
          <stop offset={1} stopColor="#52E7F8" />
        </linearGradient>
        <linearGradient
          id="prefix__paint2_linear_29:256"
          x1={24.607}
          y1={12.689}
          x2={3.565}
          y2={28.735}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#fff" stopOpacity={0} />
        </linearGradient>
        <filter
          id="prefix__filter0_bd_29:256"
          x={-2.5}
          y={-1.5}
          width={33.496}
          height={32.683}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImage" stdDeviation={2} />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_29:256"
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
            in2="effect1_backgroundBlur_29:256"
            result="effect2_dropShadow_29:256"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect2_dropShadow_29:256"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default InboxIcon;
