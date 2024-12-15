
import React from 'react';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import styles from '../style/ProductPage.module.css';
import { useParams, useNavigate } from 'react-router-dom';

type HeaderStyleProps = {
	name: string;
	descripteon: string;
}

const ProductPage: React.FC<HeaderStyleProps> = () => {
	const navigate = useNavigate();
	const { id } = useParams<{id:string}>();
	const idPage = Number(id);
	const { items } = useSelector((state: RootState) => state.artworks);
	const item = items.find(item => item.id === idPage);
	if (!item) return <div>item not found</div>;
	return(
		<div className={styles.productpage}>
			<div className={styles.productpage_container}>
				{item.image_id ? (
						<img className={styles.itemImagse}
							src={`https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`}
							alt={item.title}
						/>
				) : (
					<p className={styles.skeleton}>Изображение <br />отсутствует</p>
				)}
				<div className={styles.itemText}>
					<h3>{item.title}</h3>
					<p>{item.description}</p>
					<button onClick={() => navigate('/')} className={styles.productpageButton}>
						Вернуться на главную
					</button>
				</div>
			</div>
			
		</div>
	)
}

export default ProductPage;