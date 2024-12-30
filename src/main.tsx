import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './providers/ThemeProvider.ts';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Routes.tsx';
import { store } from './redux/store';
import { Toaster } from 'sonner';
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Toaster />
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </HelmetProvider>
  </StrictMode>
);
