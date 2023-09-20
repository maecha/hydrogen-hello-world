import * as path from 'path';
import * as VitestConfig from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

export default VitestConfig.defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    includeSource: ['./app/**/*.{ts,tsx}'],
    exclude: ['node_modules', 'e2e'],
  },
  resolve: {
    alias: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      '~': path.resolve(__dirname, 'app'),
    },
  },
  plugins: [react(), tsconfigPaths()],
});
