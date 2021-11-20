import * as React from 'react';

function CommentIcon(props) {
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
        d="M2.98 16c-.233 0-.465-.064-.672-.192a1.271 1.271 0 01-.607-1.088v-1.876C.363 11.15-.215 9.033.071 6.86.532 3.375 3.397.518 6.884.068a7.927 7.927 0 016.616 2.207 7.921 7.921 0 012.324 6.57c-.396 3.556-3.268 6.482-6.828 6.957a7.928 7.928 0 01-4.172-.573l-1.27.635c-.182.09-.378.136-.573.136z"
        fill="currentColor"
      />
    </svg>
  );
}

export default CommentIcon;
