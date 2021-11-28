import React from 'react';
import ReactDOM from 'react-dom';
import '@fontsource/nunito';
import App from './App';

const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  MOUNT_NODE
);
