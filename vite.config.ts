import react from '@vitejs/plugin-react';
import { defineConfig, TransformResult } from 'vite';
import dts from 'vite-plugin-dts';
import viteTsconfigPaths from 'vite-tsconfig-paths';

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
    react({ include: /\.(ts|tsx)$/ }),
    viteTsconfigPaths(),
    dts({ rollupTypes: true }),
  ],
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
