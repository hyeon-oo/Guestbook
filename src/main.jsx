import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Tailwind 사용 시 필수
import GuestBookPage from './GuestBookPage.jsx'; // 실제 경로에 따라 이름 조정

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GuestBookPage />
  </React.StrictMode>
);
