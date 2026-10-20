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

      if (!fs.existsSync(assetsDir)) return;

      // Copy only new or changed files, and never let a locked file abort the dev server.
      const syncDir = (fromDir: string, toDir: string) => {
        fs.mkdirSync(toDir, { recursive: true });
        for (const entry of fs.readdirSync(fromDir, { withFileTypes: true })) {
          const src = path.join(fromDir, entry.name);
          const dest = path.join(toDir, entry.name);
          if (entry.isDirectory()) {
            syncDir(src, dest);
            continue;
          }
          try {
            const srcStat = fs.statSync(src);
            const destStat = fs.existsSync(dest) ? fs.statSync(dest) : null;
            if (destStat && destStat.size === srcStat.size && destStat.mtimeMs >= srcStat.mtimeMs) continue;
            fs.copyFileSync(src, dest);
          } catch (err) {
            this.warn(`Could not sync asset "${path.relative(assetsDir, src)}": ${(err as Error).message}`);
          }
        }
      };
      syncDir(assetsDir, publicAssetsDir);
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
