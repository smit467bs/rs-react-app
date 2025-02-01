import { Component } from 'react';
import { Card } from '../card/Card.tsx';

interface Props {
  items: string[];
}

export class CardList extends Component<Props> {

  render() {
    return (
      <div>
        {this.props.items.map((name) => (
          <Card key={name} name={name} />
        ))}
      </div>
    );
  }

}
