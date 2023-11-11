import React from 'react';
import { ButtonGroup, Button } from '@mui/material';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
      {pages.map((page) => (
        <Button
          key={page}
          disabled={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default Pagination;
