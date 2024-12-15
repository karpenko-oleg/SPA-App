import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '../assets/FavoriteIcon';
import CloseIcon from '../assets/CloseIcon';
import { addFavorite, removeFavorite, deleteArtwork } from '../redux/slice/produx';
import styles from '../style/ArtworksList.module.css';

type HeaderStyleProps = {
  name: string;
  descripteon: string;
  productId: number;
  onDelete: (id: number) => void;
};

const ArtworksItem: React.FC<HeaderStyleProps> = ({ productId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { items, favorites } = useSelector((state: RootState) => state.artworks);
  const item = items.find((item) => item.id === productId);

  if (!item) return <div>Item not found</div>;

  const handleCardClick = (id: number) => {
    navigate(`/product/${id}`);
  };

  const handleToggleFavorite = (artwork: Artwork) => {
    const isFavorite = favorites.some((fav) => fav.id === artwork.id);
    if (isFavorite) {
      dispatch(removeFavorite(artwork.id));
    } else {
      dispatch(addFavorite(artwork));
    }
  };

  const isFavorite = favorites.some((fav) => fav.id === item.id);

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteArtwork(productId));
  };

  return (
    <li onClick={() => handleCardClick(productId)}>
      {item.image_id ? (
        <img
          className={styles.itemImagse}
          src={`https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`}
          alt={item.title}
        />
      ) : (
        <p className={styles.skeleton}>
          Изображение <br />
          отсутствует
        </p>
      )}
      <span
      className={styles.closeIcon}
      onClick={handleDelete}
      >
        <CloseIcon/>
      </span>
      <span
        className={styles.favorite}
        onClick={(e) => {
          e.stopPropagation();
          handleToggleFavorite(item);
        }}
      >
        <FavoriteIcon fill={isFavorite ? '#ff0000' : '#000000'} />
      </span>
      <div className={styles.itemText}>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    </li>
  );
};

export default ArtworksItem;
