// pages/page.jsx

'use client';
import React from 'react';

import Main from '@/pages/Home';
import AuthPage from '@/pages/login-page';

import { Provider } from 'react-redux';
import store from '../store/store';


const Home = () => {
  return (
    <Provider store={store}>
    <AuthPage/>
  </Provider>

   
  );
};

export default Home;

