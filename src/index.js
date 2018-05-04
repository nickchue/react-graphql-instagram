import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Pusher from 'pusher-js';

const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
  cluster: process.env.REACT_APP_PUSHER_CLUSTER,
  encrypted: process.env.REACT_APP_PUSHER_ENCRYPTED
});

ReactDOM.render(
  <App pusher={pusher} />,
  document.getElementById('root')
);
