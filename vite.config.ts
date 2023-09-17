import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react({ include: /\.(ts|tsx)$/ }), viteTsconfigPaths(), dts({ rollupTypes: true })],
  assetsInclude: ['**/*.md'],
  build: {
    lib: { entry: './src/index.tsx', name: 'react-blogs', fileName: 'index' },
    rollupOptions: {
      external: ['react'],
      output: {
        globals: {
          react: 'react',
        },
      },
    },
  },
});
