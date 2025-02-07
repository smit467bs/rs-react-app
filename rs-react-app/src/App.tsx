import './App.css';

import { Route, Routes } from 'react-router';
import { SearchPage } from './pages/search-page/SearchPage.tsx';
import { NotFoundPage } from './pages/not-found/not-found-page.tsx';


export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );

};
