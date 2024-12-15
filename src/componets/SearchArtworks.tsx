import React, { useState, useEffect } from 'react';

import styles from "../style/SearchArtworks.module.css";

interface SearchArtworksProps {
  onSearch: (searchTerm: string) => void;
	name: string;
	description: string;
}

const SearchArtworks: React.FC<SearchArtworksProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, onSearch]);

  return (
    <div className={styles.SearchArtworks}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Найдите все нужное"
      />
    </div>
  );
};

export default SearchArtworks;
