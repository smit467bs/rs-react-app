import { Component } from 'react';

interface Props {
  name: string;
  url: string;
}


export class Card extends Component<Props> {

  render() {
    return (
      <div>
        <h3>{this.props.name}</h3>
        <p>Описание для {this.props.url}</p>
      </div>
    );
  }

}
