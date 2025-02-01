import { Component } from 'react';

interface Props {
  name: string;
}



export class Card extends Component<Props> {

  render() {
    return (
      <div>
        <h3>{this.props.name}</h3>
        <p>Описание для {this.props.name}</p>
      </div>
    );
  }

}
