import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:8000',
				changeOrigin: true,
				configure: (proxy, options) => {
					// proxy will be an instance of 'http-proxy'
				},
			},
		},
	},
	plugins: [react(), tailwindcss()],
});
