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
    this.props.onSearch(this.state.query.trim().toLowerCase());
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.query}
          onChange={this.handleChange}
          placeholder="Введите запрос..."
        />
        <button onClick={this.hangleSearch}>Search</button>
      </div>
    );
  }
}
