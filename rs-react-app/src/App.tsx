import './App.css';
import { Search } from './components/search/search.tsx';
import { Card } from './components/card/Card.tsx';
import { CardList } from './components/card-list/card-list.tsx';

function App() {

  const temporyArray: string[] = ['one', 'two', 'three'];

  return (
    <>
      <Search />

      <CardList items={temporyArray} />
    </>
  );
}

export default App;
