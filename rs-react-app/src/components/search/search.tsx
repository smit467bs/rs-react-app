import { Component } from 'react';

interface Props {
  onSearch: (search: string) => void;
  defaultValue: string;
}

interface State {
  query: string;
}

export class Search extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { query: this.props.defaultValue || '' };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  hangleSearch = () => {
    if (this.state.query) {
      this.props.onSearch(this.state.query.trim().toLowerCase());
    } else this.props.onSearch('');
  };

  render() {
    return (
      <div>
        <input
          className="
          search-input border-l-black rounded-2xl shadow-sm text-black focus:ring-red-500"
          type="text"
          value={this.state.query}
          onChange={this.handleChange}
          placeholder="Введите запрос..."
        />
        <button
          className="rounded-2xl bg-black text-white hover:bg-red-400"
          onClick={this.hangleSearch}
        >
          Search
        </button>
      </div>
    );
  }
}
