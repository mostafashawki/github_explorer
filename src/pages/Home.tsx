import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Switch, FormControlLabel } from '@mui/material';
import SearchBar from '@/components/SearchBar';
import RepoList from '@/components/RepoList';
import Pagination from '@/components/Pagination';
import LoadingIndicator from '@/components/LoadingIndicator';
import { useRepositories } from '@/hooks/useRepositories';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [username, setUsername] = useState<string | null>(queryParams.get('username') || null);
  const [currentPage, setCurrentPage] = useState<number>(Number(queryParams.get('page')) || 1);
  const [sortBy, setSortBy] = useState<string>(queryParams.get('sort') || 'updated');
  const perPage = 10;

  const { repositories, total = 0, isLoading, isError } = useRepositories();

  const handleSortToggle = () => {
    setSortBy(prev => prev === 'updated' ? 'stars' : 'updated');
    navigate(`${location.pathname}?username=${username}&per_page=${perPage}&page=${currentPage}&sort=${sortBy}`);
  };

  const handleSearch = (searchedUsername: string) => {
    setUsername(searchedUsername);
    setCurrentPage(1);
    setSortBy('updated');
    navigate(`${location.pathname}?username=${username}&per_page=${perPage}&page=${currentPage}&sort=${sortBy}`);
  }

  useEffect(() => {
    // Update URL whenever username or sorting changes
    if (!username) return;
    navigate(`${location.pathname}?username=${username}&per_page=${perPage}&page=${currentPage}&sort=${sortBy}`);
  }, [username, sortBy, navigate, location.pathname, currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    navigate(`${location.pathname}?username=${username}&page=${pageNumber}&sort=${sortBy}`);
  };

  return (
    <>
      <SearchBar onSearch={(searchedUsername) => handleSearch(searchedUsername)} />

      <FormControlLabel
        control={
          <Switch 
            checked={sortBy === 'stars'} 
            onChange={handleSortToggle}
            name="sortStars" 
            color="primary" 
          />
        }
        label="Sort by Stars"
      />

      {isLoading && <LoadingIndicator />}
      {isError && <div>Error loading data.</div>}
      {repositories && (
      <RepoList 
        repositories={repositories}
      />
      )}
      {repositories && (
      <Pagination 
        currentPage={currentPage}
        totalPages={Math.ceil(total / 10)}
        onPageChange={handlePageChange}
      />
      )}
    </>
  );
};

export default Home;
