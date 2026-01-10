import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: [['babel-plugin-react-compiler']],
			},
		}),
	],
	build: {
		outDir: '../public',
		emptyOutDir: true,
	},
	resolve: {
		alias: {
			"images": path.resolve(__dirname, "assets/images"),
			"shared": path.resolve(__dirname, "src/shared"),
			"core": path.resolve(__dirname, "src/core"),
			"features": path.resolve(__dirname, "src/features"),
		},
	},
})
