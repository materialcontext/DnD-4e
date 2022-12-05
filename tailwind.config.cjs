/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/html/utils/withMT");

module.exports = withMT({
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				"prussian": "#003153",
				"oxford": {
					"900": "#002147",
					"10": "#f4f5f7"
				},
				"space-cadet": "#1d2951",
				"gainsboro": "#DADEE1",
				"pgl-red": "#E72B32",
				"cinnabar": "#e34234",
				"satin-gold": "#cba135",
				"goldenrod": "#DAA520",
				"dutch-white": "#f0dfbb",
				"ivory": "#fffff0",
				"offwhite": "#fcfcfa",
				"floral-white": "#fcf8f1",
			}
		},
	},
	plugins: [],
});
