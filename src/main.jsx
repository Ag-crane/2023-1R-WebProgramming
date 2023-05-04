import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'          //App은 html 태그 덩어리를 반환하는 함수
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(           //root라는 태그 안에다가 App을 넣어줌
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
