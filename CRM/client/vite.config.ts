import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths'; // --> import it

export default defineConfig({
   plugins: [react(), tsconfigPaths()],
   server: {
      proxy: {
         '/api/userdata': 'http://localhost:3000',
         '/api/tasks': 'http://localhost:3000',
         '/api/clients': 'http://localhost:3000',
         '/api/markets': 'http://localhost:3000',
      },
   },
});
