import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBoundary from '../../components/ErrorBoundary'; 

// This is a component that will throw an error for testing purposes
const ThrowErrorComponent = () => {
  throw new Error("Test error");
};

describe('<ErrorBoundary />', () => {
  it('should display an error message when wrapped component throws', () => {
    const consoleError = console.error;
    console.error = jest.fn(); // Muting console.error to prevent unnecessary logs in test

    const { getByText } = render(
      <ErrorBoundary>
        <ThrowErrorComponent />
      </ErrorBoundary>
    );

    expect(getByText("Something went wrong.")).toBeInTheDocument();

    console.error = consoleError; // Restoring console.error
  });

  it('should not display an error message for working components', () => {
    const { container, queryByText } = render(
      <ErrorBoundary>
        <div>Test</div>
      </ErrorBoundary>
    );

    expect(queryByText("Something went wrong.")).not.toBeInTheDocument();
    expect(container.firstChild).toHaveTextContent("Test");
  });
});
