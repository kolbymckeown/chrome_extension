/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	i18n: {
		locales: ["en", "fr"],
		defaultLocale: "en",
	},
	// allowed image urls
	images: {
		domains: ["lh3.googleusercontent.com"],
	},
};

module.exports = nextConfig;
