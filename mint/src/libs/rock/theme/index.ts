import { useMemo } from "react";
import {
  createMuiTheme,
  PaletteColorOptions,
  responsiveFontSizes,
  Color,
  SimplePaletteColorOptions,
} from "@material-ui/core";
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export const primary: SimplePaletteColorOptions = {
  main: "#4f44e0",
  dark: "#463dbb",
  light: "#7856ff",
  contrastText: "#f8f8f8",
};

export const secondary: SimplePaletteColorOptions = {
  main: "#BDEAF8",
  dark: "##98DCF2",
  light: "#F3F6FB",
  contrastText: "##FFF5CA",
};

export const error: SimplePaletteColorOptions = {
  main: "#DF7800",
  dark: "#B96607",
  light: "#6C4316",
  contrastText: "#000000",
};

export const warning: SimplePaletteColorOptions = {
  main: "#f00",
  dark: "#f00",
  light: "#f00",
  contrastText: "#f00",
};

export const info: SimplePaletteColorOptions = {
  main: "#f00",
  dark: "#f00",
  light: "#f00",
  contrastText: "#f00",
};

export const success: SimplePaletteColorOptions = {
  main: "#f00",
  dark: "#f00",
  light: "#f00",
  contrastText: "#f00",
};

export const grey: Partial<Color> = {
  50: "#FAFAFA",
  100: "#F6F6F6",
  200: "#E9E9E9",
  300: "#8F8F91",
  400: "#626266",
  500: "#2A2A2F",
  600: "#202020",
  700: "#1A1A1A",
  800: "#131415",
};

export function themeOptions(type: "light" | "dark"): ThemeOptions {
  return {
    palette: {
      type: type,
      primary,
      secondary,
      error,
      warning,
      info,
      success,
      grey,
      contrastThreshold: 3,
      tonalOffset: 0.2,
      action: {
        disabledBackground: primary.main,
        disabled: "#FAFAFA",
      },
    },
    typography: {
      fontFamily: [
        "Gibson",
        "NeueHaasUnicaPro",
        "SF Pro Text",
        "SF Pro Icons",
        "Helvetica Neue",
        "Helvetica",
        "Arial",
        "sans-serif",
      ].join(","),
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      h1: {
        fontFamily:
          "Gibson-Light, NeueHaasUnicaPro, SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica",
        fontWeight: "lighter",
        fontSize: "105px",
        letterSpacing: "-1.5px",
      },
      h2: {
        fontFamily:
          "Gibson-Light, NeueHaasUnicaPro, SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica",
        fontWeight: "lighter",
        fontSize: "66px",
        letterSpacing: "-0.5px",
      },
      h3: {
        fontFamily:
          "Gibson-Regular, NeueHaasUnicaPro, SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica",
        fontWeight: "normal",
        fontSize: "52px",
        letterSpacing: "0px",
      },
      h4: {
        fontFamily:
          "Gibson-SemiBold, NeueHaasUnicaPro, SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica",
        fontWeight: "bold",
        fontSize: "37px",
        letterSpacing: "0.25px",
      },
      h5: {
        fontFamily:
          "Gibson-SemiBold, NeueHaasUnicaPro, SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica",
        fontWeight: "bold",
        fontSize: "26px",
        letterSpacing: "0px",
      },
      h6: {
        fontFamily:
          "Gibson-SemiBold, NeueHaasUnicaPro, SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica",
        fontWeight: "bold",
        fontSize: "22px",
        letterSpacing: "0.15px",
      },
      subtitle1: {
        fontFamily:
          "Gibson-Regular, NeueHaasUnicaPro, SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica",
        fontSize: "17px",
        letterSpacing: "0.15px",
      },
      subtitle2: {
        fontFamily:
          "Gibson-SemiBold, NeueHaasUnicaPro, SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica",
        fontWeight: "bold",
        fontSize: "15px",
        letterSpacing: "0.1px",
      },
      body1: {
        fontFamily:
          "NeueHaasUnicaPro-Regular, SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica",
        fontWeight: "normal",
        fontSize: "16px",
        letterSpacing: "0.5px",
      },
      body2: {
        fontFamily:
          "NeueHaasUnicaPro-SemiBold, SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica",
        fontWeight: "bold",
        fontSize: "15px",
        letterSpacing: "0.25px",
      },
      button: {
        fontFamily:
          "NeueHaasUnicaPro-Medium, SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica",
        fontWeight: 500,
        fontSize: "14px",
        letterSpacing: "0.5px",
        textTransform: 'unset',
      },
      caption: {
        fontFamily:
          "NeueHaasUnicaPro-Regular, SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica",
        fontSize: "12px",
        letterSpacing: "0.4px",
      },
      overline: {
        fontFamily:
          "NeueHaasUnicaPro-Regular, SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica",
        fontSize: "10px",
        letterSpacing: "1.5px",
      },
    },

    props: {
      MuiButton: {
        size: 'small',
      },
      MuiButtonBase: {
        disableRipple: true,
      },
      MuiTextField: {
        size: "small",
        variant: "outlined",
        InputLabelProps: {
          shrink: true,
        },
      },
    },
    overrides: {
      MuiPaper: {
        rounded: {
          borderRadius: 12,
        },
        elevation1: {
          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.103775)",
        },
        elevation8: {
          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.103775)",
        },
      },
      MuiButton: {
        text: {
          "&:hover": {
            backgroundColor: "unset",
          },
        },
        disabled: {},
        contained: {
          borderRadius: 8,
          "&:disabled": {
            opacity: 0.8,
          },
          "&:focus": {
            boxShadow: `0px 0px 0px 4px ${primary.main}33`,
          },
          "&:hover": {
            boxShadow: `0px 0px 0px 4px ${primary.main}33`,
          },
        },
      },
      MuiOutlinedInput: {
        root: {
          borderRadius: 8,
        },
        input: {
          borderRadius: 8,
        },
      },
      MuiCssBaseline: {
        // @ts-ignore
        "@global": {
          "@font-face": [
            "Gibson-Light",
            "Gibson-Regular",
            "Gibson-SemiBold",
            "Gibson-Bold",
          ],
          body: {
            fontFamily: "Gibson-Regular",
            backgroundColor: "#f9f9f9",
          },
        },
      },
    },
  };
}

// Create a theme instance.
export const useTheme = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return useMemo(
    () =>
      responsiveFontSizes(
        createMuiTheme(themeOptions(prefersDarkMode ? "dark" : "light"))
      ),
    [prefersDarkMode]
  );
};

export function WithTheme({ children }) {
  const theme = useTheme();
  return children(theme);
}
