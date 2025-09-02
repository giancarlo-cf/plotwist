import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import PlotPage from '@components/pages/plot-page/PlotPage';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faSliders);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PlotPage />
  </StrictMode>
);
