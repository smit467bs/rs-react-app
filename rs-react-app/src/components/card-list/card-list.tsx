import { Component } from 'react';
import { Card } from '../card/Card.tsx';

interface Props {
  items: Pokemon[];
}

interface Pokemon {
  name: string;
  url: string;
}

export class CardList extends Component<Props> {
  render() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 overflow-hidden break-words">
        {this.props.items.map((item) => (
          <Card key={item.name} name={item.name} url={item.url} />
        ))}
      </div>
    );
  }
}
