import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArtworks } from '../redux/slice/produx';
import { RootState, AppDispatch } from '../redux/store';
import ArtworksItem from './ArtworksItem';

import styles from '../style/ArtworksList.module.css';
import SearchArtworks from './SearchArtworks';

type HeaderStyleProps = {
  name: string;
  description: string;
}

const ArtworksList: React.FC<HeaderStyleProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, favorites, currentPage, totalPages, loading, error } = useSelector((state: RootState) => state.artworks);
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');
  const [hiddenFilter, setHiddenFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchArtworks({ page: currentPage, limit: 20, search: searchTerm }));
  }, [dispatch, currentPage, searchTerm]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(fetchArtworks({ page: currentPage + 1, limit: 20, search: searchTerm }));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(fetchArtworks({ page: currentPage - 1, limit: 20, search: searchTerm }));
    }
  };

  const handleFilterChange = (newFilter: 'all' | 'favorites') => {
    setFilter(newFilter);
  };

  const handleHiddenFilter = () => {
    setHiddenFilter(!hiddenFilter);
  };

  

  const displayedItems = filter === 'all' ? items : favorites;

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className={styles.artworkList}>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <SearchArtworks onSearch={handleSearch} />
      <div className={styles.artworkList_filter}>
        <h3 onClick={handleHiddenFilter}>
          <strong>Фильтры</strong>
          <i>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left">
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
          </i>
        </h3>
        {hiddenFilter && (
          <ul>
            <li onClick={() => handleFilterChange('all')} className={filter === 'all' ? styles.activeFilter : ''}>
              Все продукты
            </li>
            <li onClick={() => handleFilterChange('favorites')} className={filter === 'favorites' ? styles.activeFilter : ''}>
              Избранные
            </li>
          </ul>
        )}
      </div>
      <ul className={styles.itemContainer}>
        {displayedItems.length > 0 ? (
          displayedItems.map((product) => (
            <ArtworksItem key={product.id} productId={product.id}/>
          ))
        ) : (
          <div className={styles.itemContainerNotFound}>Товары отсутствуют</div>
        )}
      </ul>
      <div className={styles.buttonContainer}>
        <button className={styles.pagination} onClick={handlePrevPage} disabled={currentPage === 1}>
          &larr;
        </button>
        <button className={styles.pagination} onClick={handleNextPage} disabled={currentPage === totalPages}>
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default ArtworksList;
