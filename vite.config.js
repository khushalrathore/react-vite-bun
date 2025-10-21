import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'esbuild',
    sourcemap: false,
    target: 'es2018',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  define: {
    __DEV__: false,
  },
});
