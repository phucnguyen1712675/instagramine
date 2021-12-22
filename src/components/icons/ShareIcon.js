import * as React from 'react';

function ShareIcon(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.863.137a.468.468 0 00-.506-.103L.295 6.059a.469.469 0 00-.03.856l5.939 2.881 2.88 5.94a.469.469 0 00.857-.03L15.966.642a.469.469 0 00-.103-.506z"
        fill="currentColor"
        fillOpacity={0.5}
      />
      <path
        d="M15.863.137l-9.66 9.66 2.881 5.939a.469.469 0 00.857-.03L15.966.642a.469.469 0 00-.103-.506z"
        fill="currentColor"
      />
    </svg>
  );
}

export default ShareIcon;
