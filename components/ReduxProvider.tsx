'use client'
import React from 'react'
import { Provider } from 'react-redux';
import { setupStore } from '@/store/store';

const store = setupStore();

const ReduxProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Provider store={store} >
      {children}
    </Provider>
  )
}

export default ReduxProvider
