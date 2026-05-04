import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button, Result } from "antd";

interface State {
  hasError: boolean;
}

interface Props {
  children: ReactNode;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Uncaught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status="error"
          title="Something went wrong"
          subTitle="An unexpected error occurred. Please try again."
          extra={
            <Button type="primary" onClick={() => this.setState({ hasError: false })}>
              Try again
            </Button>
          }
        />
      );
    }
    return this.props.children;
  }
}
