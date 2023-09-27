import { extendTheme } from '@chakra-ui/react';

const activeLabelStyles = {
  transform: 'scale(0.85) translateY(-24px)',
};

const theme = extendTheme({
  fonts: {
    heading: `'system-ui', 'sans-serif'`,
    body: `'system-ui', 'sans-serif'`,
  },
  colors: {
    primary: {
      50: '#e3f2fd',
      100: '#bbdefb',
      200: '#90caf9',
      300: '#64b5f6',
      400: '#42a5f5',
      500: '#2196f3',
      600: '#1e88e5',
      700: '#1976d2',
      800: '#1565c0',
      900: '#0d47a1',
    },
    background: {
      light: '#fdfcf6',
      dark: '#1b243d',
    },
    accent: {
      50: '#fff3e0',
      100: '#ffe0b2',
      200: '#ffcc80',
      300: '#ffb74d',
      400: '#ffa726',
      500: '#ff9800',
      600: '#fb8c00',
      700: '#f57c00',
      800: '#ef6c00',
      900: '#e65100',
    },
    success: {
      50: '#eafaea',
      100: '#d4f5d4',
      200: '#bdf1bd',
      300: '#a7ecad',
      400: '#90e790',
      500: '#79e279',
      600: '#62dd62',
      700: '#4bb543',
      800: '#349234',
      900: '#1e6f24',
    },
    scheme: {
      'warm-white': '#fdfcf6',
      'light-rose': '#ead2ce',
      'dusty-rose': '#c96a6c',
      'bg-green-blue': '#e5ebe7',
      'main-green-blue': '#4c8d99',
      'dark-blue': '#1b243d',
    },
    styles: {
      global: {
        body: {
          color: '#1b243d',
        },
      },
    },
  },
});

export default theme;
