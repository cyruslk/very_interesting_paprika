import React from 'react';
import ReactDOM from 'react-dom';
import Favicon from 'react-favicon';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <div>
      <Favicon url="https://res.cloudinary.com/www-c-t-l-k-com/image/upload/v1615576007/paprika%20-%20very%20interesting/VI_Favicon.svg" />
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
