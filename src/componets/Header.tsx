
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import styles from '../style/Header.module.css';

type HeaderStyleProps = {
	name: string;
	descripteon: string;
}

const Header: React.FC<HeaderStyleProps> = () => {
	const { favoriteCount } = useSelector((state: RootState) => state.artworks);
	const navigate = useNavigate();
	return(
		<header className={styles.header}>
			<h2  onClick={() => navigate('/')} className={styles.logo}>
				Олег Карпенко<br />
				<span>Frontend Developer</span>
			</h2>
			<nav>
				<button onClick={() => navigate('favorits')}>Избранное {favoriteCount?favoriteCount:""}</button>
				<button onClick={() => navigate('create')}>Создать</button>
				<a className={styles.button} href="http://" target="_blank" rel="noopener noreferrer">Написать в TG</a>
			</nav>
			
		</header>
	)
}
export default Header;