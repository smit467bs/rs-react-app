import { Component } from 'react';

interface Props {
  name: string;
  url: string;
}

export class Card extends Component<Props> {
  render() {
    return (
      <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition duration-300">
        <h3 className="text-xl font-semibold text-gray-800">{this.props.name}</h3>
        <p className="text-gray-600">Описание для {this.props.url}</p>
      </div>
    );
  }
}
