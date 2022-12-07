import React, { Component } from "react";
import { ENVIRONMENT } from "../../Utilities/Constant";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }
  render() {
    const { error, errorInfo } = this.state;
    if (errorInfo) {
      const errorDetails =
        ENVIRONMENT.DEVELOPMENT === process.env.NODE_ENV ? (
          <details className="preserve-space">
            {error && error.toString()}
            <br />
            {errorInfo.componentStack}
          </details>
        ) : undefined;
      return (
        <div>
          <h2 className="error">An unexpected error has occurred.</h2>
          {errorDetails}
        </div>
      );
    }
    return this.props.children;
  }
}
