

const  getQueryParams = (query: string) => {
    const params = new URLSearchParams(query);
    return {
      username: params.get('username') || '',
      name: params.get('name') || '',
      page: Number(params.get('page')) || 1,
      perPage: Number(params.get('per_page')) || 10,
      sortBy: params.get('sort') || 'updated'
    };
  };

  export default  getQueryParams