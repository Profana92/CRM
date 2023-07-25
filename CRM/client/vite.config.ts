import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths'; // --> import it

export default defineConfig({
   plugins: [react(), tsconfigPaths()],
   server: {
      proxy: {
         '/api': 'http://localhost:3000',
         '/userdata': 'http://localhost:3000',
      },
   },
});
