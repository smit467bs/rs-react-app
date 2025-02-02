import './App.css';
import { Search } from './components/search/search.tsx';
import { CardList } from './components/card-list/card-list.tsx';
import { Component } from 'react';

const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=10';

interface State {
  items: string[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  throwError: boolean;
}

export class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      items: [],
      isLoading: false,
      error: null,
      searchQuery: localStorage.getItem('searchQuery') || '',
      throwError: false, // Флаг для искусственной ошибки
    };
  }

  fetchData = async (query: string) => {
    this.setState({ isLoading: true, error: null });
    localStorage.setItem('searchQuery', query.trim().toLowerCase());

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Ошибка загрузки');

      const data = await response.json();
      this.setState({ items: data.results.map((item) => item.name), isLoading: false });
    } catch (e) {
      this.setState({ error: 'Не удалось загрузить данные!!!', isLoading: false });
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
      <div>
        <Search onSearch={this.fetchData} defaultValue={this.state.searchQuery} />
        {this.state.isLoading ? <p>Loading...</p> : null}
        {this.state.error ? <p>{this.state.error}</p> : null}
        <CardList items={this.state.items} />
        <button onClick={this.throwTestError}>Выкинуть ошибку</button>
      </div>

    );
  }
}
