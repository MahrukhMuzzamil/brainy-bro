import { defineConfig } from 'vite';
import reactDomAlias from 'react-dom';

export default defineConfig({
  resolve: {
    alias: {
     // 'react-dom': reactDomAlias,
    },
  },
});
