import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import EnvironmentPlugin from "vite-plugin-environment";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
	css: {
		postcss: {
			plugins: [tailwindcss()],
		},
	},
	plugins: [react(), EnvironmentPlugin(["DATA_URL"])],
	server: {
		hmr: {
			host: "localhost",
		},
		port: 3000,
	},
});