import React from 'react';
import ReactDOM from 'react-dom/client';
import Providers from './providers';
import { Navigate } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Providers>
        
        <Navigate  to = "/login" />
  
         </Providers>
 

);

