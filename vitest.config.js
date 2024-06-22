import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
	test: {
		globals: true,
		environment: "nuxt",
		coverage: {
			include: [
				'components/**/*.{js,ts,vue}',  // Example: Include all JavaScript, TypeScript, and Vue files in 'components' directory
				'pages/**/*.vue',               // Include all Vue files in 'pages' directory
				'utils/*.js',
				'services/*.js',                   // Include all JavaScript files in 'utils' directory
				'layouts/*.vue', 
				'plugins/*.js',   
				'middleware/*.js',   
			  ],
		}
	},
})
