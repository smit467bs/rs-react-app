import './App.css';
import { Search } from './components/search/search.tsx';
import { Card } from './components/card/Card.tsx';

function App() {

  return (
    <>
      <Search />
      <Card name={'VasiliyInfo'} />
    </>
  );
}

export default App;
