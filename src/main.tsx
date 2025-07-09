import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import PlotPage from '@components/pages/plot-page/PlotPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PlotPage />
  </StrictMode>
);
