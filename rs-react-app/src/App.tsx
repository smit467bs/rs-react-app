import './App.css';

import { Route, Routes } from 'react-router';
import { SearchPage } from './pages/search-page/SearchPage.tsx';


export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
    </Routes>
  );

};
