import { defineConfig } from 'vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react({ include: /\.(ts|tsx)$/ }), viteTsconfigPaths()],
  assetsInclude: ['**/*.md'],
  build: {
    lib: { entry: './index.html', name: 'react-blogs' },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'react',
          'react-dom': 'react-dom',
        },
      },
    },
  },
});
