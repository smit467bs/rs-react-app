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
      <div>
        {this.props.items.map((item) => (
          <Card key={item.name} name={item.name} url={item.url} />
        ))}
      </div>
    );
  }
}
