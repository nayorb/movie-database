import { createTheme, CSSInterpolation, ThemeOptions } from "@mui/material";

declare module "@mui/material/styles" {
  interface Components {
    AppSearchInput?: {
      styleOverrides?: {
        root?: CSSInterpolation;
      };
    };
  }
}

const palette = {
  primary: {
    main: "#353565",
    dark: "#07103a",
    light: "#848296",
  },
  secondary: {
    main: "#f08080",
    dark: "#e96767",
    light: "#e69f9f",
  },
  background: {
    default: "#ffebcd",
  },
};

export const theme: ThemeOptions = createTheme({
  components: {
    AppSearchInput: {
      styleOverrides: {
        root: {
          backgroundColor: palette.primary.light,
          borderRadius: 999,
          padding: "4px 4px 4px 16px",
          color: "#fff",

          "&::before": {
            border: "0 !important",
          },
          "&.MuiInput-underline:after": {
            borderBottom: 0,
          },

          "& .MuiInput-input": {
            paddingLeft: 8,
          },
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          "& .MuiPaginationItem-root": {
            color: palette.primary.main,
            borderColor: palette.primary.main,

            "&.Mui-selected": {
              backgroundColor: palette.secondary.main,
            },
          },
        },
      },
    },
  },
  palette,
});

export default theme;
