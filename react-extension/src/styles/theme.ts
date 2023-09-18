import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
	fonts: {
		heading: `'Manrope', 'sans-serif'`,
		body: `'Manrope', 'sans-serif'`,
	},
	colors: {
		primary: {
			50: "#e3f2fd",
			100: "#bbdefb",
			200: "#90caf9",
			300: "#64b5f6",
			400: "#42a5f5",
			500: "#2196f3",
			600: "#1e88e5",
			700: "#1976d2",
			800: "#1565c0",
			900: "#0d47a1",
		},
		background: {
			light: "#F7FAFC",
			dark: "#1A202C",
		},
		accent: {
			50: "#fff3e0",
			100: "#ffe0b2",
			200: "#ffcc80",
			300: "#ffb74d",
			400: "#ffa726",
			500: "#ff9800",
			600: "#fb8c00",
			700: "#f57c00",
			800: "#ef6c00",
			900: "#e65100",
		},
		success: {
			50: "#eafaea",
			100: "#d4f5d4",
			200: "#bdf1bd",
			300: "#a7ecad",
			400: "#90e790",
			500: "#79e279",
			600: "#62dd62",
			700: "#4bb543",
			800: "#349234",
			900: "#1e6f24",
		},
	},
});

export default theme;
