import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { removeFavorite } from '../redux/slice/produx';
import { useNavigate } from 'react-router-dom';
import styles from '../style/FavoritePage.module.css';

import imgNotFavorite from "../assets/favorite/notFavorite.png";
type HeaderStyleProps = {
  name: string;
  description: string;
};

const FavoritePage: React.FC<HeaderStyleProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { favorites } = useSelector((state: RootState) => state.artworks);

  const handleRemoveFavorite = (id: number) => {
    dispatch(removeFavorite(id));
  };
	if(favorites.length === 0){
		return <NotFavorite/>
	}
  return (
    <div className={styles.favoritePage}>
      <h2>Ваши избранные продукты</h2>
      <ul>
        {favorites.map((artwork) => (
          <li key={artwork.id} className={styles.favoriteContainer}>
						<div className={styles.favoriteImages}>
							{artwork.image_id ? (
								<img
									src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
									alt={artwork.title}
								/>
							) : (
								<p>Изображе</p>
							)}
						</div>
            <div className={styles.favoriteText}>
							<h3>{artwork.title}</h3>
							<p>{artwork.description}</p>
							<button onClick={() => handleRemoveFavorite(artwork.id)}>
								Удалить
							</button>
						</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritePage;

const NotFavorite: React.FC<HeaderStyleProps> = () => {
	const navigate = useNavigate();
	return(
		<div className={styles.notFavorite}>
			<img className={styles.imgNotFavorite} src={imgNotFavorite} alt="imgNotFavorite" />
			<h4>В избранных пусто!</h4>
			<button onClick={()=>navigate('/')}>перейти на главную</button>
		</div>
	)
}