import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'public/admin.html'),
        login: resolve(__dirname, 'public/login.html'),
        'content-editor': resolve(__dirname, 'public/content-editor.html'),
        'blog-editor': resolve(__dirname, 'public/blog-editor.html'),
        'job-editor': resolve(__dirname, 'public/job-editor.html'),
        insights: resolve(__dirname, 'public/insights.html'),
        post: resolve(__dirname, 'public/post.html'),
      },
    },
  },
  publicDir: 'public',
});
