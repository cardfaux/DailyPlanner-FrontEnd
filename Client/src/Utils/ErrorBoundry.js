import React, { Component } from 'react';

import Button from '../Shared/Components/FormElements/Button/Button';

class ErrorBoundry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <React.Fragment>
          <h1>Sorry, something went wrong :(</h1>
          <Button href='/'>GO BACK HOME</Button>
        </React.Fragment>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundry;
