import { useEffect, useMemo, useState } from "react";
import {
  responsiveFontSizes,
  Color,
  SimplePaletteColorOptions,
} from "@material-ui/core";
import { createTheme, ThemeOptions } from "@material-ui/core/styles";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { storage } from "../utils";

export const primary: SimplePaletteColorOptions = {
  main: "#665df5",
  dark: "#463dbb",
  light: "#7856ff",
  contrastText: "#f5f5f5",
};

export const secondary: SimplePaletteColorOptions = {
  main: "#1c1c1c",
  dark: "#202020",
  light: "#202020",
  contrastText: "#f5f5f5",
};

export const tertiary: SimplePaletteColorOptions = {
  main: "#6ad1e0",
  dark: "#6ad1e0",
  light: "#6ad1e0",
  contrastText: "#f5f5f5",
};

export const link: SimplePaletteColorOptions = {
  main: "#6ad1e0",
  dark: "#1e88e5",
  light: "#64b5f6",
  contrastText: "#f5f5f5",
};

export const golden: SimplePaletteColorOptions = {
  main: "#B96607",
  dark: "#B96607",
  light: "#f5931b",
  contrastText: "#1c1c1c",
};

export const error: SimplePaletteColorOptions = {
  main: "#DF7800",
  dark: "#B96607",
  light: "#6C4316",
  contrastText: "#1c1c1c",
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
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#eeeeee",
  300: "#e0e0e0",
  400: "#bdbdbd",
  500: "#757575",
  600: "#616161",
  700: "#424242",
  800: "#212121",
};

export const blue: Partial<Color> = {
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
  A100: "#82b1ff",
  A200: "#448aff",
  A400: "#2979ff",
  A700: "#2962ff",
};

declare module "@material-ui/core/styles" {
  interface Theme {
    colors: {
      tertiary: SimplePaletteColorOptions;
      golden: SimplePaletteColorOptions;
      link: SimplePaletteColorOptions;
      blue: Partial<Color>;
    };
  }
  interface ThemeOptions {
    colors?: {
      golden: SimplePaletteColorOptions;
      tertiary: SimplePaletteColorOptions;
      link: SimplePaletteColorOptions;
      blue?: Partial<Color>;
    };
  }
}

export function themeOptions(type: "light" | "dark"): ThemeOptions {
  return {
    colors: {
      golden,
      tertiary,
      link,
      blue,
    },
    palette: {
      type,
      primary,
      secondary,
      background: {
        default: type === "dark" ? "#020202" : "#ffffff",
        paper: type === "dark" ? "#090909" : "#efeff1",
      },
      text: {
        primary: type === "dark" ? "#eeeeee" : "#535b62",
        secondary: type === "dark" ? "#f6f7f8" : "#57565d",
      },
      error,
      warning,
      info,
      success,
      grey,
      contrastThreshold: 3,
      tonalOffset: 0.4,
      action: {
        disabledBackground: primary.main,
        disabled: "#fafafa",
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
        textTransform: "unset",
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
        size: "small",
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
          borderRadius: 4,
        },
        elevation1: {
          boxShadow: type === 'dark' ? `0 1px 4px 0 ${primary.main}33`: "0 1px 4px 0 rgb(0 0 0 / 10%)",
        },
        elevation8: {
          boxShadow: type === 'dark' ? `0 1px 4px 0 ${primary.main}33` :  "0 1px 4px 0 rgb(0 0 0 / 10%)",
        },
      },
      MuiMenuItem: {
        root: {
          borderRadius: 0,
        },
      },
      MuiIconButton: {
        root: {
          "&:disabled": {
            opacity: 0.4,
          },
          "&:focus": {
            // boxShadow: `0px 0px 0px 4px ${primary.main}33`,
          },
          "&:hover": {
            // boxShadow: `0px 0px 0px 4px ${primary.main}33`,
            transform: "scale(1.03)",
          },
          "&:active": {
            transform: "scale(.98)",
          },
        },
      },
      MuiChip: {
        root: {
          borderRadius: "12px"
        }
      },
      MuiButton: {
        text: {
          borderRadius: 4,
          paddingLeft: 16,
          paddingRight: 16,
          "&:disabled": {
            opacity: 0.4,
          },
          "&:focus": {
            boxShadow: `0px 0px 0px 4px ${primary.main}33`,
          },
          "&:hover": {
            boxShadow: `0px 0px 0px 4px ${primary.main}33`,
            backgroundColor: "unset",
          },
        },
        disabled: {},
        contained: {
          borderRadius: 4,
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
          borderRadius: 4,
        },
        input: {
          borderRadius: 4,
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
            backgroundColor: type === "dark" ? "#020202" : "#ffffff",
          },
          h1: {
            fontFamily:
              "Gibson-Light, NeueHaasUnicaPro, SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica",
            fontWeight: "lighter",
            fontSize: "66px",
            letterSpacing: "-0.5px",
          },
          h2: {
            fontFamily:
              "Gibson-Regular, NeueHaasUnicaPro, SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica",
            fontWeight: "normal",
            fontSize: "52px",
            letterSpacing: "0px",
          },
          h3: {
            fontFamily:
              "Gibson-SemiBold, NeueHaasUnicaPro, SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica",
            fontWeight: "bold",
            fontSize: "37px",
            letterSpacing: "0.25px",
          },
          h4: {
            fontFamily:
              "Gibson-SemiBold, NeueHaasUnicaPro, SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica",
            fontWeight: "bold",
            fontSize: "26px",
            letterSpacing: "0px",
          },
          h5: {
            fontFamily:
              "Gibson-SemiBold, NeueHaasUnicaPro, SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica",
            fontWeight: "bold",
            fontSize: "22px",
            letterSpacing: "0.15px",
          },
          p: {
            fontFamily:
              "NeueHaasUnicaPro-Regular, SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica",
            fontWeight: "normal",
            fontSize: "16px",
            letterSpacing: "0.5px",
          },
          caption: {
            fontFamily:
              "NeueHaasUnicaPro-Regular, SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica",
            fontSize: "12px",
            letterSpacing: "0.4px",
          },
        },
      },
    },
  };
}

// Create a theme instance.
export function useTheme() {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // const prefersLightMode = useMediaQuery("(prefers-color-scheme: light)");
  // console.log({prefersLightMode})
  // useEffect(() => {
  //   setDarkMode(!prefersLightMode);
  // }, [prefersLightMode]);


  function update() {
    const dark_mode = storage.get.dark_mode();
    setDarkMode(!dark_mode);
    storage.put.dark_mode(!dark_mode);
  }
  useEffect(() => {
    document?.addEventListener?.("toggle_dark_mode", update);
    return () => {
      document?.removeEventListener?.("toggle_dark_mode", update);
    };
  }, []);
  return useMemo(
    () =>
      responsiveFontSizes(
        createTheme(themeOptions(darkMode ? "dark" : "light"))
      ),
    [darkMode]
  );
}

export function WithTheme({ children }) {
  const theme = useTheme();
  return children(theme);
}
