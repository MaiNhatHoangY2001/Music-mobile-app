import { Text } from 'react-native';
import { Link } from 'react-router-native';
import styles from './Home.module.scss';

function Home() {
    return (
        <Link to="/list-music" style={styles.container}>
            <Text style={styles.link}>List Music</Text>
        </Link>
    );
}

export default Home;
