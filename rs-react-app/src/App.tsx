import './App.css';
import { Search } from './components/search/search.tsx';
import { CardList } from './components/card-list/card-list.tsx';
import { useState, useEffect } from 'react';
import { useSearchQuery } from './hooks/useSearchQuery.ts';

const API_URL = 'https://pokeapi.co/api/v2/pokemon/';


interface Pokemon {
  name: string;
  url: string;
}

export const App = () => {

  const [items, setItems] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useSearchQuery();
  const [throwError, setThrowError] = useState(false);

  useEffect(() => {
    fetchData(searchQuery);
  }, []);

  const fetchData = async (query: string) => {
    setIsLoading(true);
    setError(null);
    localStorage.setItem('searchQuery', query.trim().toLowerCase());
    setSearchQuery(query);

    try {
      const response = query
        ? await fetch(API_URL + query)
        : await fetch(API_URL + '?limit=10');
      if (!response.ok) {
        if (response.status === 404) {
          setItems([]);
          setError(`Извините, мы не нашли по запросу: "${query}"`);
          setIsLoading(false);
          return;
        } else {
          setError('Ошибка загрузки');
          throw new Error('Ошибка загрузки');
        }
      }

      const data = await response.json();

      setItems(
        query ? [
            {
              name: data.name,
              url: `https://pokeapi.co/api/v2/pokemon/${data.name}`,
            },
          ]
          : data.results.map((item: Pokemon) => item),
      );
      setIsLoading(false);
    } catch (error) {
      setError(String(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    fetchData(query);
  };

  if (throwError) {
    throw new Error('Тест ошибки');
  }


  return (
    <>
      <h1 className="text-3xl text-white mb-6">PokeApi search</h1>

      <div className="w-full max-w-screen-xl max-w-md bg-white shadow-md rounded-lg p-4 mb-6">
        <Search
          onSearch={handleSearch}
          defaultValue={searchQuery}
        />
      </div>
      <div
        className="w-full max-w-screen-xl mx-auto px-4 min-h-screen bg-gray-100 flex flex-col items-center p-4">
        {isLoading ? (
          <p className="text-blue-500 text-lg">Loading...</p>
        ) : null}
        {error ? (
          <p className="text-red-500 text-lg">{error}</p>
        ) : null}
        <div className="w-full max-w-screen-lg">
          <CardList items={items} />
        </div>
        <button
          className="mt-6 bg-black hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => setThrowError(true)}
        >
          Выкинуть ошибку
        </button>
      </div>
    </>
  );
};
