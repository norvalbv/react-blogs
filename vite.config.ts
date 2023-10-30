import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { plugin as mdPlugin, Mode } from 'vite-plugin-markdown';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [
    cssInjectedByJsPlugin(),
    vanillaExtractPlugin(),
    mdPlugin({ mode: [Mode.HTML] }),
    react({ include: /\.(ts|tsx)$/ }),
    viteTsconfigPaths(),
    dts({ rollupTypes: true }),
  ],
  assetsInclude: [/\.md$/, '**/*.md', '.md'],
  build: {
    lib: { entry: './src/index.ts', name: 'react-blogs', fileName: 'index' },
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
