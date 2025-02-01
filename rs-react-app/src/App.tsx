import './App.css';
import { Search } from './components/search/search.tsx';
import { CardList } from './components/card-list/card-list.tsx';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary.tsx';
import { Component } from 'react';
import { Card } from './components/card/Card.tsx';

const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=10';

interface State {
  items: string[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
}

interface Pokemon {
  name: string;
  url: string;
}

export class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      items: [],
      isLoading: false,
      error: null,
      searchQuery: localStorage.getItem('searchQuery') || '',
    };
  }

  fetchData = async (query: string) => {
    const trimmedQuery = query.trim().toLowerCase();

    this.setState({
      isLoading: true,
      error: null,
    });
    localStorage.setItem('searchQuery', trimmedQuery);
    try {
      const response = await fetch(`${API_URL}`);
      if (!response.ok) throw new Error('Ошибка загрузки');

      const data = await response.json();
      console.log(data);

      this.setState({ items: data.results.map((item: Pokemon) => item), isLoading: false });
    } catch (e) {
      this.setState({ error: 'Не удалось загрузить данные!!!', isLoading: false });
    }
  };


  render() {
    return (
      <ErrorBoundary>
        <div>
          <Search
            onSearch={this.fetchData}
            defaultValue={this.state.searchQuery} />

          {this.state.isLoading ? <p>Loading...</p> : null}
          {this.state.error ? <p>{this.state.error}</p> : null}
          <CardList items={this.state.items} />
          <button onClick={() => {
            throw new Error('Тест ошибки');
          }}>Выкинуть ошибку
          </button>

        </div>
      </ErrorBoundary>
    );
  }
}
