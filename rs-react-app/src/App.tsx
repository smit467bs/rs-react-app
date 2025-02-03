import './App.css';
import { Search } from './components/search/search.tsx';
import { CardList } from './components/card-list/card-list.tsx';
import { Component } from 'react';

const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

interface State {
  items: Pokemon[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  throwError: boolean;
}

interface Pokemon {
  name: string;
  url: string;
}

export class App extends Component<{ '' }, State> {
  constructor(props: { '' }) {
    super(props);
    this.state = {
      items: [],
      isLoading: false,
      error: null,
      searchQuery: localStorage.getItem('searchQuery') || '',
      throwError: false,
    };
  }

  fetchData = async (query: string) => {
    this.setState({ isLoading: true, error: null });
    localStorage.setItem('searchQuery', query.trim().toLowerCase());

    try {
      const response = query
        ? await fetch(API_URL + query)
        : await fetch(API_URL + '?limit=10');
      if (!response.ok) {
        if (response.status === 404) {
          this.setState({
            items: [],
            error: `Извините, мы не нашли по запросу: "${query}"`,
            isLoading: false,
          });
          return;
        } else {
          throw new Error('Ошибка загрузки');
        }
      }

      const data = await response.json();
      this.setState({
        items: query
          ? [
            {
              name: data.name,
              url: `https://pokeapi.co/api/v2/pokemon/${data.name}`,
            },
          ]
          : data.results.map((item) => item),
        isLoading: false,
      });
    } catch (e) {
      this.setState({
        error: e,
        isLoading: false,
      });
    }
  };

  throwTestError = () => {
    this.setState({ throwError: true });
  };

  render() {
    if (this.state.throwError) {
      throw new Error('Тест ошибки');
    }

    return (
      <>
        <h1 className="text-3xl text-white mb-6">
          PokeApi search
        </h1>

        <div className="w-full max-w-screen-xl max-w-md bg-white shadow-md rounded-lg p-4 mb-6">
          <Search
            onSearch={this.fetchData}
            defaultValue={this.state.searchQuery}
          />
        </div>
        <div className="w-full max-w-screen-xl mx-auto px-4 min-h-screen bg-gray-100 flex flex-col items-center p-4">


          {this.state.isLoading ? (
            <p className="text-blue-500 text-lg">Loading...</p>
          ) : null}
          {this.state.error ? (
            <p className="text-red-500 text-lg">{this.state.error}</p>
          ) : null}
          <div className="w-full max-w-screen-lg">
            <CardList items={this.state.items} />
          </div>
          <button
            className="mt-6 bg-black hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={this.throwTestError}
          >
            Выкинуть ошибку
          </button>
        </div>
      </>);
  }
}
