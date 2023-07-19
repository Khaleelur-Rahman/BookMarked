import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <BrowserRouter>
//       <App />
//       <ToastContainer />
//     </BrowserRouter>
// )

const rootElement = document.getElementById('root');
// console.log(rootElement)
const root = createRoot(rootElement);
// console.log(root)

root.render (
  <BrowserRouter>
  <App />
  <ToastContainer />
</BrowserRouter>
);

