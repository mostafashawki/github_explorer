// import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Pagination from '../../components/Pagination'; 
import '@testing-library/jest-dom';



describe('Pagination Component', () => {
  it('renders the correct number of pages', () => {
    const { getAllByRole } = render(
      <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />
    );
    const buttons = getAllByRole('button');
    expect(buttons).toHaveLength(5);
  });

  it('disables the current page button', () => {
    const currentPage = 3;
    const { getByText } = render(
      <Pagination currentPage={currentPage} totalPages={5} onPageChange={() => {}} />
    );
    const button = getByText(currentPage.toString());
    expect(button).toBeDisabled();
  });

  it('calls onPageChange with the correct page number when a page button is clicked', () => {
    const onPageChange = jest.fn();
    const { getByText } = render(
      <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />
    );

    fireEvent.click(getByText('3'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('does not call onPageChange when the current page button is clicked', () => {
    const onPageChange = jest.fn();
    const currentPage = 2;
    const { getByText } = render(
      <Pagination currentPage={currentPage} totalPages={5} onPageChange={onPageChange} />
    );

    fireEvent.click(getByText(currentPage.toString()));
    expect(onPageChange).not.toHaveBeenCalled();
  });
});
