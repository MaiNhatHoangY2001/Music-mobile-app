import { useContext, useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Link } from 'react-router-native';
import { MusicContext } from '../../../context/MusicContext';
import styles from './Home.module.scss';

function Home() {
    const context = useContext(MusicContext);
    const song = context.song;
    const setSong = context.setSong;
    const data = context.data;

    const handlePushData = (item) => {
        setSong(item);
    };

    return (
        <View style={styles.container}>
            <Link to="/list-music">
                <Text style={styles.link}>List Music</Text>
            </Link>
            {data.map((item, index) => {
                return (
                    <Link key={index} to="/playing-now" onPress={() => handlePushData(item)}>
                        <Text>{item.name}</Text>
                    </Link>
                );
            })}
        </View>
    );
}

export default Home;
