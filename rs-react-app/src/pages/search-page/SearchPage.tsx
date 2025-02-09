import { useState, useEffect } from 'react';
import { useSearchQuery } from '../../hooks/useSearchQuery.ts';
import { CardList } from '../../components/card-list/card-list.tsx';
import { Search } from '../../components/search/search.tsx';
import { Pagination } from '../../components/pagination/pagination.tsx';
import { useSearchParams } from 'react-router';
import { DetailsPage } from '../details-page/details-page.tsx';


const API_URL = 'https://pokeapi.co/api/v2/pokemon/';


interface Pokemon {
  name: string;
  url: string;
}

export const SearchPage = () => {

  const [items, setItems] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useSearchQuery();
  const [throwError, setThrowError] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedPokemon = searchParams.get('details');
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    const fetchData = async (query: string) => {
      setIsLoading(true);
      setError(null);
      localStorage.setItem('searchQuery', query.trim().toLowerCase());
      setSearchQuery(query);

      try {
        const response = query
          ? await fetch(`${API_URL}${query}`)
          : await fetch(`${API_URL}?limit=10&offset=${(page - 1) * 10}`);
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
        setTotalPages(query ? 1 : Math.ceil(data.count / 10));
        setIsLoading(false);
      } catch (error) {
        setError(String(error));
      } finally {
        setIsLoading(false);
      }
    };
    fetchData(searchQuery);
  }, [searchQuery, page]);


  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ page: String(page) });
  };

  if (throwError) {
    throw new Error('Тест ошибки');
  }


  return (
    <>
      <div
        className="relative flex"
      >
        <div
          className={`w-${selectedPokemon ? '2/3' : 'full'}`}
        >
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
              <DetailsPage />
              {!error && !isLoading && totalPages > 1 && (
                <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
              )}
            </div>

            <button
              className="mt-6 bg-black hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => setThrowError(true)}
            >
              Выкинуть ошибку
            </button>
          </div>
        </div>
        <DetailsPage />
      </div>
    </>
  );
};
