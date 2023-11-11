import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, CssBaseline, CircularProgress } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import ErrorBoundary  from '@/components/ErrorBoundary';
import Header from './components/AppBar';
import Home from '@/pages/Home';
const RepoDetails = React.lazy(() => import('@/pages/RepoDetails'));
import { ReactQueryDevtools } from 'react-query/devtools';


const App: React.FC = () => {
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <Container>
          <CssBaseline />
          <ErrorBoundary>
            <Suspense fallback={<CircularProgress />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/repo" element={<RepoDetails />} />
                {/* <Route path="/:username/:name" element={<RepoDetails />} />   */}
              </Routes>
            </Suspense>
            </ErrorBoundary>
        </Container>
      </Router>
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

export default App;
