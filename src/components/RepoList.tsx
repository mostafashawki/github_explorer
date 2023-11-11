import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { Link, useLocation } from "react-router-dom";
import getQueryParams from '@/utils/getQueryParams';

interface Repository {
  name: string;
  description: string;
  stargazers_count: number;
  url: string;
}

interface RepoListProps {
  repositories: Repository[];
}



const RepoList: React.FC<RepoListProps> = ({ repositories }) => {
    const location = useLocation();
    const { username, page, sortBy } = getQueryParams(location.search);
    
  return (
    <List>
      {repositories.map((repo) => (
        <ListItem key={repo.name} >
            <ListItemText
                primary={<Typography variant="h6">{repo.name}</Typography>}
                secondary={
                <>
                    <Typography variant="body2" component="span">{repo.description}</Typography>
                    <br />
                    <Typography variant="caption" component="span">⭐️ {repo.stargazers_count}</Typography>
                </>
                }
            />
            <Link to={`repo?username=${username}&name=${repo.name}&sort=${sortBy}&page=${page}`}>
                Repo Details
            </Link>
            </ListItem>


      ))}
    </List>
  );
};

export default RepoList;
