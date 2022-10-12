import { Toaster } from 'react-hot-toast';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Outlet } from 'react-router-dom';
import { notify } from './components/Notification';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.state.data !== undefined) {
        notify({ message: error.message, isError: true });
      }
    },
  }),
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Outlet />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
