import { defineConfig } from 'vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [
    react({ include: /\.(ts|tsx)$/ }),
    viteTsconfigPaths(),
    createHtmlPlugin({
      minify: true,
    }),
  ],
  server: {
    port: 9999,
  },
});
