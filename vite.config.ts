import react from '@vitejs/plugin-react';
import { defineConfig, TransformResult } from 'vite';
import dts from 'vite-plugin-dts';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import { plugin as mdPlugin, Mode } from 'vite-plugin-markdown';

export default defineConfig({
  plugins: [
    {
      name: 'add-emotion-jsx-pragma',
      enforce: 'pre',
      transform(code: string, id: string): TransformResult | null {
        if (/\.[jt]sx?$/.test(id)) {
          return {
            code: `/** @jsxImportSource @emotion/react */\n${code}`,
            map: null,
          };
        }
        return null;
      },
    },
    mdPlugin({ mode: [Mode.HTML] }),
    react({ include: /\.(ts|tsx)$/ }),
    viteTsconfigPaths(),
    dts({ rollupTypes: true }),
  ],
  // resolve
  assetsInclude: [/\.md$/, '**/*.md', '.md'],
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
