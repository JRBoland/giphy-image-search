import React, { useState } from 'react'
import { fetchGif } from '../utils/fetchGifs';

type Image = {
  id: string;
  title: string;
  url: string;
  images: {
    downsized: {
      url: string;
    }
  }
}

const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const gifs = await fetchGif(searchTerm, (errorMessage) =>
        console.error(errorMessage),
      );
      setImages(gifs || []); // Update state with the response data
    } catch (error) {
      console.error('Error:', error);
    }
    setIsLoading(false);
  };

  // Pressing enter triggers search
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-component">
      <input
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button onClick={handleSearch}>
        Go
      </button>

      <div className="search-results">
        {isLoading && <div className="loader"></div>}
        {!isLoading &&
          images.map((image) => (
            <div className="image-section" key={image.id}>
              {/*Downsized to adjust for bandwidth. downsized = max 2mb*/}
              <img src={image.images.downsized.url} alt={image.title} />
              
              <div className="links-section">
                <button onClick={() => window.open(image.url, '_blank')}>
                  View on Giphy
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(image.images.downsized.url);
                    console.log('Clicked! Copied ', image.images.downsized.url);
                  }}
                >
                  Copy URL
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Search;