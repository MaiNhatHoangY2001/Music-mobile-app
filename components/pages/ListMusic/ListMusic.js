import { Text } from 'react-native';
import { Link } from 'react-router-native';
import styles from './ListMusic.module.scss';

function ListMusic() {
    return (
        <Link to="/" style={styles.container}>
            <Text style={styles.link}>Home</Text>
        </Link>
    );
}

export default ListMusic;
