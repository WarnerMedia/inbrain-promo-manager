import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Amplify } from 'aws-amplify';
import { AmplifyProvider, Authenticator } from '@aws-amplify/ui-react';
import Router from './Router';
import Logo from './components/Logo';
import awsExports from './aws-exports';
import './index.css';

Amplify.configure(awsExports);

const components = {
  Header() {
    return (
      <div className="w-full md:mx-auto md:max-w-md">
        <Logo className="mx-auto h-12 w-auto fill-brand" />
        <h2 className="mt-6 text-center text-xl font-extrabold text-gray-900 md:text-3xl">
          Inbrain Promo Manager
        </h2>
      </div>
    );
  },
};

ReactDOM.render(
  <StrictMode>
    <AmplifyProvider>
      <Authenticator components={components}>
        <Router />
      </Authenticator>
    </AmplifyProvider>
  </StrictMode>,
  document.getElementById('root')
);
