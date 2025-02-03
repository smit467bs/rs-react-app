import { Component } from 'react';
import { Poke } from '../../interfaces';

interface Props {
  name: string;
  url: string;
}

interface State {
  error: Error;
  pokeInfo: Poke | null;
}


export class Card extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      error: null,
      pokeInfo: null,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    try {
      const response = await fetch(`${this.props.url}`);
      if (response.ok) {
        const data = await response.json();
        this.setState({ pokeInfo: data });
      } else {
        throw new Error(`Could not fetch data from ${this.props.url}`);
      }
    } catch (e) {
      throw new Error(
        `Could not fetch data from ${(this.props.url, e.message)}`,
      );
    }
  }

  render() {
    return (
      <div className="bg-white shadow-md rounded-lg p-2 border border-gray-200 hover:shadow-xl transition duration-300">
        <h3 className="text-xl font-semibold text-gray-800">
          {this.props.name}
        </h3>
        {this.state.pokeInfo ? (
          <div className="text-gray-700 text-sm">
            {this.state.pokeInfo.sprites.front_default ? (
              <img
                className="w-32 h-32 mx-auto mb-2 border border-gray-300 rounded-lg"
                src={this.state.pokeInfo.sprites.front_default}
                alt={this.state.pokeInfo.name}
              />
            ) : null}
            <p>
              <span className="font-medium">Weight: </span>{' '}
              {this.state.pokeInfo.weight}
            </p>
            <p>
              <span className="font-medium">Height: </span>{' '}
              {this.state.pokeInfo.height}
            </p>
          </div>
        ) : (
          <p className="text-gray-600">Loading.....</p>
        )}
      </div>
    );
  }
}
