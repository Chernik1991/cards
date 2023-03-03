import React from 'react'

import * as ReactDOMClient from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'

import App from './app/App'
import { store } from './app/store'

const root = ReactDOMClient.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
