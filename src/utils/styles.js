import { keyframes } from '@emotion/core';

/*
 * NOTE: use a six-character hex code for all colors to allow alpha channel
 * adjustment without adding extra vars and/or a color manipulation lib.
 *
 * Example:
 *    // use the brand color at 25% opacity
 *    border-color: ${colors.brand}40;
 */

export const colors = {
  logo: '#EAD2AC',
  background: '#fff',
  scrollbar: '#EAD2AC',
  brandPrimary: '#2e5e7e',
  brandDarker: '#2f3f4f',
  brandDark: '#2d5e7b',
  brand: '#0081AF',
  grey: '#eee',
  sidebar: '#fbf7ed',
  brandBright: '#fefefe',
  brandLight: '#fbffee',
  brandLighter: '#efefef',
  lightest: '#ffffff',
  darkest: '#283035',
  text: '#333333',
  textMild: '#555555',
  textLight: '#aaa',
  textLighter: '#ccc',
  tuscan: `#ffd689`,
  accent: `#ffb238`,
  error: `#ec1818`,
  lemon: `#ffdf37`
};

export const badgeThemes = {
  HELLOWORLD: {
    level: 1,
    backgroundTheme: colors.brand,
    textTheme: colors.tuscan
  },
  SHOPPINGSPREE: {
    level: 2,
    backgroundTheme: colors.tuscan,
    textTheme: colors.brandDark
  }
};

export const spacing = {
  '3xs': 2,
  '2xs': 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48
};

export const breakpoints = {
  mobile: 400,
  phablet: 550,
  tablet: 750,
  desktop: 1000,
  hd: 1300
};

export const radius = {
  default: 2,
  large: 4
};

export const defaultFontStack = [
  'Source Sans pro',
  'Lato',
  'Open Sans',
  'Helvetica Neue',
  'sans-serif'
].join();

const monospaceFontStack = [
  `Space Mono`,
  `SFMono-Regular`,
  `Menlo`,
  `Monaco`,
  `Consolas`,
  `Liberation Mono`,
  `Courier New`,
  `monospace`
].join();

export const fonts = {
  body: defaultFontStack,
  heading: defaultFontStack,
  monospace: monospaceFontStack
};

export const dimensions = {
  sidebarWidth: '420px',
  headerHeight: '60px',
  cartHeight: '80px',
  topHeadHeight: '20px',
  cartWidthDesktop: '400px',
  customerAreaWidth: {
    closedDesktop: '60px',
    openDesktop: '60px',
    openHd: '60px'
  },
  customerAreaBarHeight: '50px',
  pictureBrowserAction: {
    widthDesktop: '200px',
    heightMobile: '80px'
  }
};

export const scrollbarStyles = {
  WebkitOverflowScrolling: `touch`,
  '&::-webkit-scrollbar': { width: `6px`, height: `6px` },
  '&::-webkit-scrollbar-thumb': { background: colors.scrollbar },
  '&::-webkit-scrollbar-thumb:hover': { background: colors.tuscan },
  '&::-webkit-scrollbar-track': { background: colors.brandLight }
};

const simpleEntry = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
`;

const deadSimpleEntry = keyframes`
  from {
    opacity: .25;
  }
`;

export const animations = {
  simpleEntry: `${simpleEntry} .75s ease forwards`,
  deadSimpleEntry: `${deadSimpleEntry} .5s ease forwards`
};
