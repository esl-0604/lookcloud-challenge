/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")

const config = {
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"],
		})

		return config
	},
	reactStrictMode: false,
}

const nextConfig = withPWA({
	dest: "public",
	disable: false,
	runtimeCaching: [],
})(config)

module.exports = nextConfig
