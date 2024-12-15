
import ArtworksList from "../componets/ArtworksList";

import styles from '../style/Home.module.css';

type HeaderStyleProps = {
	name: string;
	descripteon: string;
}

const Home: React.FC<HeaderStyleProps> = () => {
	return(
		<main className={styles.container}>
			<ArtworksList/>
		</main>
	)
}
export default Home;