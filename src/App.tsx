import { Outlet } from 'react-router-dom';
import maingBg from './assets/mainBg.jpg';
import Banner from './components/Banner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <div
        style={{ backgroundImage: `url(${maingBg})` }}
        className="flex min-h-screen flex-col bg-cover bg-center bg-no-repeat font-sans text-primary subpixel-antialiased"
      >
        <Banner />
        <Outlet />
      </div>
    </QueryClientProvider>
  );
}
