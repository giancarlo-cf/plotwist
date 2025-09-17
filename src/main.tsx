import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import PlotPage from '@components/pages/plot-page/PlotPage';
import {
  faDownLong,
  faImage,
  faMinus,
  faPlus,
  faSliders,
  faTable,
  faUpLong,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faSliders, faImage, faTable, faPlus, faMinus, faUpLong, faDownLong, faXmark);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PlotPage />
  </StrictMode>
);
