import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    // mode: 'dark'
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        html {
          -webkit-font-smoothing: auto;
        }
      `,
    },
    MuiButtonGroup: {
      defaultProps: {
        variant: 'contained',
        color: 'success',
      }
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        color: 'success',
      },
    },
    MuiTextField: {
      defaultProps: {
        color: 'success',
      }
    }
  }
});

export default theme;