import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createBrowserRouter, RouterProvider,Route, Link } from 'react-router-dom'
import Home from "./Components/Home.jsx";
import Login from "./Components/Login"
import AddNewProduct from "./Components/addNewProduct"
// import Navbar from "./Components/Navbar"
import Productdata from "./Components/Productdata.jsx"

const router = createBrowserRouter([
    {
      path:"/",
      element: <App/>
    },
    {
      path:"/login",
      element: <Login/>
    },
    {
      path:"/addNewProduct",
      element: <AddNewProduct/>
    },
    {
      path: "/products/:productId",
      element: <Productdata />,
    },
  ])
  
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
