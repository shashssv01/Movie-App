import { createTheme } from '@mui/material';

const appTheme = {
  background: '#FFFFFF', 
  backgroundPaper: '#FFFFFF',
  contrastText: '#1a1a1a',
  sideBar: '#333333',
  primary: '#c4242b',
  white: '#FFFFFF',
  black: '#000000',
  secondary: '#6C7175',
  hoverGrey: '#D8D8D8'
};

const theme = createTheme({
  // breakpoints: {
  //   values: {
  //     xs: 0,
  //     sm: 425,
  //     md: 770,
  //     lg: 960,
  //     xl: 1200,
  //   },
  // },
  palette: {
    primary: {
      main: appTheme.primary,
      contrastText: appTheme.contrastText,
    },
    secondary: {
      main: appTheme.secondary,
    },
    background: {
      default: appTheme.background,
      paper: appTheme.backgroundPaper,
    },
    text: {
      primary: appTheme.black,
      secondary: appTheme.primary,
    },
    action: {
      hover: appTheme.backgroundPaper
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: '14px',
          width: '100%',
          height: '100%',
          boxSizing: 'border-box'
        },
        a: {
          textDecoration: 'none',
          color: 'inherit',
          "&:hover": {
            textDecoration: "none"
          }
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: "1rem",
          borderRadius: "1rem",
          boxShadow: "0 3px 10px rgba(0,0,0,0.29)",
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginBottom: "1rem",
          borderRadius: "10px",
        },
        "input:-webkit-autofill": {
          backgroundColor: appTheme.background
        }
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: "700",
          borderRadius: "10px",
          fontSize: "1.5rem",
          textTransform: "capitalize",
          marginBottom: "1rem",
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          color: "black",
          "&.Mui-focused": {
            borderRadius: "10px",
            outline: `3px solid ${appTheme.primary}`,
          },
        },
        path: {
          fill: "#00B89F"
        },
        input: {
          borderTopLeftRadius: "inherit",
          borderTopLightRadius: "inherit",
          borderBottomLeftRadius: "inherit",
          borderBottomRightRadius: "inherit",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "black",
          "&.Mui-focused": {
            borderColor: "#D8D8D8",
            borderRadius: "10px",
            outline: `3px solid ${appTheme.primary}`,
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#9c9c9c",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: '#db3131',
          '&$error': {
            color: '#db3131'
          },
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: '#B54141',
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: appTheme.hoverGrey
          }
        }
      }
    }
  }
})

export default theme;