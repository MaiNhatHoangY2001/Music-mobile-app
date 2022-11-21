import { useContext, useEffect, useState, useRef } from 'react';
import {
    Button,
    DrawerLayoutAndroid,
    Text,
    StyleSheet,
    View,
    Dimensions,
    Image,
    Touchable,
    TouchableOpacity,
} from 'react-native';
import { Link } from 'react-router-native';
import { MusicContext } from '../../../context/MusicContext';
import styles from './Home.module.scss';
import BottomPlaying from '../../Layout';
import { FlatList } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

function Home() {
    const drawer = useRef(null);

    const navigationView = () => (
        <View style={[styles1.container, styles1.navigationContainer]}>
            <View style={styles1.buttonClose}>
                <TouchableOpacity onPress={() => drawer.current.closeDrawer()}>
                    <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles1.listItem}>
                <Link to="/">
                    <View style={styles1.item}>
                        <View style={styles1.icon}>
                            <Ionicons name="home-sharp" size={30} color="rgba(137, 150, 184, 0.6);" />
                        </View>
                        <Text style={styles1.title}>Home</Text>
                    </View>
                </Link>
                <Link to="/list-music">
                    <View style={styles1.item}>
                        <View style={styles1.icon}>
                            <Ionicons name="list" size={30} color="rgba(137, 150, 184, 0.6);" />
                        </View>
                        <Text style={styles1.title}>List Music</Text>
                    </View>
                </Link>
                <Link to="/playing-now">
                    <View style={styles1.item}>
                        <View style={styles1.icon}>
                            <Ionicons name="play" size={30} color="rgba(137, 150, 184, 0.6);" />
                        </View>
                        <Text style={styles1.title}>Playing Now</Text>
                    </View>
                </Link>
            </View>
        </View>
    );

    const context = useContext(MusicContext);
    const setSong = context.setSong;
    const songsData = context.songsData;
    const [songs, setSongs] = useState(songsData[0]);

    const handlePushData = (item) => {
        setSong(item);
    };

    useEffect(() => {
        setSongs(songsData.filter((item) => item.id <= 20));
    }, [songsData]);

    return (
        <DrawerLayoutAndroid ref={drawer} drawerWidth={300} drawerPosition="left" renderNavigationView={navigationView}>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Link to="/" onPress={() => drawer.current.openDrawer()}>
                        <Text style={styles.link}>=</Text>
                    </Link>
                    <Image
                        style={styles.imgIcon}
                        source={{
                            uri: 'https://res.cloudinary.com/dh0i5v2tb/image/upload/v1668608763/LTDDNC/adjust-horizontal-altB_ortpxd.png',
                        }}
                    />
                </View>
                <View style={{ marginTop: 40 }}>
                    <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                        <Text style={styles.recommend}>Recommended for you</Text>
                    </View>

                    <View>
                        <FlatList
                            horizontal
                            data={songs}
                            renderItem={({ item, index }) => {
                                return (
                                    <Link key={index} to="/playing-now" onPress={() => handlePushData(item)}>
                                        <View style={styles.listSong}>
                                            <View
                                                style={{
                                                    elevation: 20,
                                                    shadowColor: 'red',
                                                    position: 'absolute',
                                                    top: 10,
                                                    left: 10,
                                                    borderRadius: 12,
                                                    borderColor: 'rgba(255, 255, 2555, 0.4)',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                <Image
                                                    source={{ uri: item.uri }}
                                                    style={{
                                                        height: 200,
                                                        width: 200,
                                                        borderRadius: 12,
                                                    }}
                                                    blurRadius={10}
                                                />
                                            </View>
                                            <View
                                                style={{
                                                    borderRadius: 12,
                                                    borderWidth: 0,
                                                    borderColor: 'rgba(255, 255, 2555, 0.4)',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                <Image
                                                    source={{ uri: item.uri }}
                                                    style={{
                                                        height: 200,
                                                        width: 200,
                                                        borderRadius: 12,
                                                    }}
                                                />
                                            </View>

                                            <Text style={styles.nameSong} numberOfLines={1}>
                                                {item.name}
                                            </Text>
                                            <Text style={styles.nameSinger} numberOfLines={1}>
                                                {item.singer}
                                            </Text>
                                        </View>
                                    </Link>
                                );
                            }}
                        ></FlatList>
                    </View>
                </View>

                <View style={{ marginTop: 40 }}>
                    <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                        <Text style={styles.recommend}>My Playlist</Text>
                    </View>

                    <View>
                        <FlatList
                            horizontal
                            data={songs}
                            renderItem={({ item, index }) => {
                                return (
                                    <Link key={index} to="/playing-now" onPress={() => handlePushData(item)}>
                                        <View style={styles.listSong}>
                                            <View
                                                style={{
                                                    elevation: 20,
                                                    shadowColor: 'red',
                                                    position: 'absolute',
                                                    top: 10,
                                                    left: 10,
                                                    borderRadius: 12,
                                                    borderColor: 'rgba(255, 255, 2555, 0.4)',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                <Image
                                                    source={{ uri: item.uri }}
                                                    style={{
                                                        height: 200,
                                                        width: 200,
                                                        borderRadius: 12,
                                                    }}
                                                    blurRadius={10}
                                                />
                                            </View>
                                            <View
                                                style={{
                                                    borderRadius: 12,
                                                    borderWidth: 0,
                                                    borderColor: 'rgba(255, 255, 2555, 0.4)',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                <Image
                                                    source={{ uri: item.uri }}
                                                    style={{
                                                        height: 200,
                                                        width: 200,
                                                        borderRadius: 12,
                                                    }}
                                                />
                                            </View>
                                            <Text style={styles.nameSong} numberOfLines={1}>
                                                {item.name}
                                            </Text>
                                            <Text style={styles.nameSinger} numberOfLines={1}>
                                                {item.singer}
                                            </Text>
                                        </View>
                                    </Link>
                                );
                            }}
                        ></FlatList>
                    </View>
                </View>
                <BottomPlaying />
            </View>
        </DrawerLayoutAndroid>
    );
}

export default Home;

const styles1 = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 36,
    },
    navigationContainer: {
        backgroundColor: 'rgba(9, 18, 39, 1)',
    },
    buttonClose: {
        marginLeft: 20,
        alignItems: 'flex-start',
    },
    listItem: {
        flex: 1,
        marginTop: 20,
    },
    icon: {
        width: 50,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        color: '#ffffff',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    title: {
        flex: 1,
        fontSize: 20,
        color: '#ffffff',
    },
});
