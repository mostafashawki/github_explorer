# Github Explorer App

## Overview
The Github Explorer App is designed to efficiently fetch repositories from Github. Built with React, TypeScript, and Vite, it offers a seamless experience for users who want to explore Github repositories with a variety of features.

## Key Features

1. **Fetch Repositories**: This app fetches repositories from Github, primarily using the search endpoint to leverage the `total_count` attribute, which aids in the paging logic.

2. **URL Parameters**: Parameters are injected into the URL, serving a dual purpose:
   - Facilitating sharing between components.
   - Ensuring transparency for the user. A hard reload by the user will consistently return the results as seen in the URL.

3. **React Query Integration**: The app utilizes `react-query` for efficient data fetching and caching:
   - Enables caching of fetched repositories.
   - When viewing repository details, data is returned from cache, negating the need for a fresh request.

4. **Client-Side Routing**: Users can click on a repository to view more detailed information.

5. **Sorting by Stars**: Repositories can be sorted based on the number of stars they have.

6. **Loading Indicator**: While fetching data from the GitHub API, a loading indicator is displayed to keep users informed.

7. **Additional Features**: As a demonstration of the app's capabilities, several other features are integrated for a rich user experience.

8. **UI Components**: The user interface is crafted using Material UI, offering a modern and responsive design.

## Unit Tests
Two unit tests have been added as examples for the application.

## Running the App

To run the Github Explorer App:

1. Install the required packages:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## Testing

To run the unit tests:

```bash
npm run test
```

---