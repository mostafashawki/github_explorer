import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import getQueryParams from '@/utils/getQueryParams';

interface Repository {
  id: number;
  name: string;
  stargazers_count: number;
  description: string;
  url: string;
  language: string;
}

interface RepositoriesResponse {
    items: Repository[];
    total_count: number;
}

export function useRepositories() {
    const location = useLocation();
    const { username, page, perPage, sortBy } = getQueryParams(location.search);

    const endpoint = `https://api.github.com/search/repositories?q=user:${username}&sort=${sortBy}&order=desc&per_page=${perPage}&page=${page}`;
    
    const fetchRepos = async (): Promise<RepositoriesResponse> => {
      if (!username) return { items: [], total_count: 0 };
      
      const response = await fetch(endpoint);
      console.log('from the hook server request  ---------------------->>>>>>>>>>>>>>> 😈😈😈😈😈😈😈', response)
      if (!response.ok) throw new Error("Couldn't fetch repositories");
      return response.json();
    };

    const {
      data,
      isLoading,
      isError,
    } = useQuery(['repositories', username, page, sortBy], fetchRepos, {
      staleTime: 1000 * 60 * 10,  // 10 minutes until data is considered stale
      cacheTime: 1000 * 60 * 30,  // 30 minutes cache retention time
    });

    return {
      repositories: data?.items,
      total: data?.total_count,
      isLoading,
      isError
    };
}
