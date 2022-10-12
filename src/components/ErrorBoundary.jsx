import { Component } from 'react';
import Logo from './Logo';

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
    if (this.state.errorInfo) {
      return (
        <div className="min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
          <div className="mx-auto max-w-max">
            <main className="sm:flex">
              <Logo className="h-16 w-16 fill-brand" />
              <div className="sm:ml-6">
                <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                  <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                    Something went wrong.
                  </h1>
                  <p className="mt-1 text-base text-gray-500">
                    {this.state.error && this.state.error.toString()}
                  </p>
                </div>
              </div>
            </main>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
