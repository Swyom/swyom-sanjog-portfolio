import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

function syncAssetsAndFallbackPlugin(): Plugin {
  return {
    name: 'sync-assets-and-fallback',
    buildStart() {
      const rootDir = process.cwd();
      const assetsDir = path.resolve(rootDir, 'assets');
      const publicAssetsDir = path.resolve(rootDir, 'public/assets');

      if (fs.existsSync(assetsDir)) {
        fs.mkdirSync(publicAssetsDir, { recursive: true });
        fs.cpSync(assetsDir, publicAssetsDir, { recursive: true });
      }
    },
    closeBundle() {
      const rootDir = process.cwd();
      const distIndex = path.resolve(rootDir, 'dist/index.html');
      const dist404 = path.resolve(rootDir, 'dist/404.html');

      if (fs.existsSync(distIndex)) {
        fs.copyFileSync(distIndex, dist404);
      }
    }
  };
}

export default defineConfig(() => {
  return {
    base: '/swyom-sanjog-portfolio/',
    plugins: [
      react(),
      tailwindcss(),
      syncAssetsAndFallbackPlugin()
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
