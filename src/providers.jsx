import React, { StrictMode } from 'react';
import {  RouterProvider } from 'react-router-dom';
import { router } from './App';
// import Protected from './Protected';
// import { ConfigProvider } from 'antd';
import './style.css'
import i18n from './i18next';

import { I18nextProvider } from 'react-i18next';


function Providers({  children }) {
  return (
   <I18nextProvider i18n={i18n}>
    <RouterProvider router={router}>
          {children}
      </RouterProvider >  
      </I18nextProvider >


  )
}

export default Providers;