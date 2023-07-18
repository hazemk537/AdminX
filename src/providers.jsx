import React from 'react';
import {  RouterProvider } from 'react-router-dom';
import { router } from './App';
// import Protected from './Protected';
// import { ConfigProvider } from 'antd';
import './style.css'
import i18n from './i18next';

import { I18nextProvider } from 'react-i18next';
import store from './Store';

import {Provider} from 'react-redux' //TODO
function Providers({  children }) {
  return (
    
   <I18nextProvider i18n={i18n}>
      <Provider store={store}>

    <RouterProvider router={router}>
          {children}
      </RouterProvider >  
      </Provider>
      </I18nextProvider >


  )
}

export default Providers;