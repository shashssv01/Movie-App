import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { GlobalProvider } from 'context';
import theme from 'components/theme/theme'
import App from 'pages/App';
import "./assets/scss/main.scss"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <GlobalProvider>
        <CssBaseline />
        <App />
      </GlobalProvider>
    </ThemeProvider>
  </BrowserRouter>
);