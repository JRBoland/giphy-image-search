import axios from 'axios';

export async function fetchGif(
  searchTerm: string,
  setError: (error: string) => void,
) {
  const API_KEY = 'RCt0VI3GhECXKohyi8zPeUptxfVJcWGr';

  try {
    if (!searchTerm) {
      throw new Error('Nothing has been searched');
    }
    const params = {
      q: searchTerm,
      limit: 5,
    };
    params['api_key'] = API_KEY; // As code would not compile with 'api_key' within params (not camel case)

    const response = await axios.get('https://api.giphy.com/v1/gifs/search', { params });
    console.log('Returned', response.data);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching gif data:', error.message);
      setError(error.message);
    } else {
      console.error('Error:', error);
      setError('An error occurred');
    }
    console.log('Error', error);
    return null;
  }
}
