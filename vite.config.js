// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Guestbook/', // 예: /guestbook-site/
  plugins: [react()],
});