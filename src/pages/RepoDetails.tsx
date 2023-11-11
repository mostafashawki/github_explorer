// RepoDetails.tsx
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRepositories } from '@/hooks/useRepositories';
import LoadingIndicator from '@/components/LoadingIndicator';
import getQueryParams from '@/utils/getQueryParams';



interface Repository {
    name: string;
    description: string;
    stargazers_count: number;
    url: string;
    language: string;
}


const RepoDetails: React.FC = () => {
    
    const location = useLocation();
    const { username, name } = getQueryParams(location.search);
    const { repositories, isLoading, isError } = useRepositories();
    const [repository, setRepository] = useState<Repository | null>(null);
    const [isNotFound, setIsNotFound] = useState(false);


    useEffect(() => {
        
        const cachedRepository: Repository | undefined = repositories?.find((repo) => repo.name === name);
       
        if (!cachedRepository) {
                setIsNotFound(true);
            return;
        }
        
            setRepository(cachedRepository);
            setIsNotFound(false);

    }, [repositories, username, name]);

   
   
        return (
            <>
            {isLoading && <LoadingIndicator />}
            {isError && <div>Error loading data.</div>}
            {isNotFound && ! repository && <div>Repository not found..</div>}
            {repository && (
            <Card style={{ maxWidth: '600px', margin: '20px auto' }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {repository.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px' }}>
                        {repository.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" >
                        {repository.language}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" style={{ marginTop: '10px', display: 'block' }}>
                        ⭐️ {repository.stargazers_count}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" href={repository.url} target="_blank" rel="noopener noreferrer">
                        View on GitHub
                    </Button>
                </CardActions>
            </Card>
            )}
        
        </>

        );
    // }
    

    
};

export default RepoDetails;
