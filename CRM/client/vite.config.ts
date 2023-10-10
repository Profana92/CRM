import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths'; // --> import it

export default defineConfig({
   plugins: [react(), tsconfigPaths()],
   server: {
      proxy: {
         '/api/userdata': 'https://localhost:3005',
         '/api/tasks': 'https://localhost:3005',
         '/api/clients': 'https://localhost:3005',
         '/api/markets': 'https://localhost:3005',
         '/api/products': 'https://localhost:3005',
         '/api/productsData': 'https://localhost:3005',
         '/api/notifications': 'https://localhost:3005',
         '/api/users': 'https://localhost:3005',
         '/api/offers': 'https://localhost:3005',
         '/api/orders': 'https://localhost:3005',
         '/api/institutions': 'https://localhost:3005',
      },
   },
});
