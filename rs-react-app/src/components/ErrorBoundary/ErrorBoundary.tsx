import { Component, ReactNode } from 'react';


interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: false };
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2>Ошибка! Попробуйте обновить страницу!</h2>
      );
    }
    ;
    return (this.props.children);
  }
}
