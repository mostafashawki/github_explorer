import React, { useState, useCallback } from 'react';
import { Paper, TextField, Button } from '@mui/material';


interface SearchBarProps {
  onSearch: (username: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [username, setUsername] = useState('');

  const handleSearch = useCallback(() => {
    onSearch(username);
  }, [username, onSearch]);

  return (
    <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
      <TextField
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        label="GitHub Username"
        variant="outlined"
      />
      <Button variant="contained" color="primary" style={{ marginLeft: '16px' }} onClick={handleSearch}>
        Search
      </Button>
      </Paper>
  );
};

export default SearchBar;

