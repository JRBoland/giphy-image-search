
export async function fetchGif(searchTerm: string, setError: (error: string) => void) {
  
  const API_KEY = ""
  
    
  try {
    if (!searchTerm) {
      throw new Error("Nothing has been searched");
    }
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=5`);
    const data = await response.json();
    console.log("Returned", data)
    return data.data; 
  } catch (error) {
    console.error("Error fetching gif data:", error);
    setError(error.message);
    console.log("Error", error)
    return null;
  }
  
}