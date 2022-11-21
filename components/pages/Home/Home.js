import { useContext, useEffect, useState } from 'react';
import { Text, View, Image, FlatList } from 'react-native';
import { Link } from 'react-router-native';
import { MusicContext } from '../../../context/MusicContext';
import styles from './Home.module.scss';
import BottomPlaying from '../../Layout';




const INT_RANDOM = 10;

function Home() {
    const context = useContext(MusicContext);
    const setSong = context.setSong;
    const songsData = context.songsData;
    const [songs, setSongs] = useState(songsData);

    const getRandomArbitrary = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }


    const handlePushData = (item) => {
        setSong(item);
    };

    const randomSong = () => {
        const lengthSongsData = songsData.length;

        console.log(songsData);

        if (songsData.length > 0) {
            for (let index = 0; index < INT_RANDOM; index++) {

                const intRandom = getRandomArbitrary(0, lengthSongsData);

                const isHaveSongInRandomPlayList = songs?.some(item => item?.id === songsData[intRandom]?.id);


                if (!isHaveSongInRandomPlayList) {
                    console.log("run");
                    setSongs(prev => [...prev, songsData[intRandom]]);
                }

            }
        }


    }

    useEffect(() => {
        randomSong();
    }, [songsData])

    return (
        <View style={styles.container}>
            {/* <View style={styles.container}>
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
            </View> */}
            <View style={{ flexDirection: 'row' }}>
                <Link to="/">
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

                <View >
                    {songsData.length === 0 ? (<Text style={styles.recommend}>You don't have a song in mobile</Text>) : <FlatList
                        horizontal
                        data={songs}
                        renderItem={({ item, index }) => {
                            return (
                                <Link key={index} to="/playing-now" onPress={() => handlePushData(item)}>
                                    <View
                                        style={styles.listSong}
                                    >

                                        <View style={{ elevation: 20, shadowColor: "red", position: 'absolute', top: 10, left: 10, borderRadius: 12, borderColor: 'rgba(255, 255, 2555, 0.4)', overflow: 'hidden' }}>
                                            <Image source={{ uri: item?.uri }} style={{
                                                height: 200,
                                                width: 200,
                                                borderRadius: 12,

                                            }} blurRadius={10} />


                                        </View>
                                        <View style={{ borderRadius: 12, borderWidth: 0, borderColor: 'rgba(255, 255, 2555, 0.4)', overflow: 'hidden' }}>
                                            <Image source={{ uri: item?.uri }} style={{
                                                height: 200,
                                                width: 200,
                                                borderRadius: 12,

                                            }} />
                                        </View>





                                        <Text style={styles.nameSong} numberOfLines={1}>{item?.name}</Text>
                                        <Text style={styles.nameSinger} numberOfLines={1}>{item?.singer}</Text>


                                    </View>
                                </Link>
                            );
                        }}
                    />}

                </View>
            </View>

            <View style={{ marginTop: 40 }}>
                <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                    <Text style={styles.recommend}>My Playlist</Text>
                </View>

                <View >
                    {songsData.length === 0 ? (<Text style={styles.recommend}>You don't have a song in mobile</Text>) : <FlatList
                        horizontal
                        data={songs}
                        renderItem={({ item, index }) => {
                            return (
                                <Link key={index} to="/playing-now" onPress={() => handlePushData(item)}>
                                    <View
                                        style={styles.listSong}
                                    >



                                        <View style={{ elevation: 20, shadowColor: "red", position: 'absolute', top: 10, left: 10, borderRadius: 12, borderColor: 'rgba(255, 255, 2555, 0.4)', overflow: 'hidden' }}>
                                            <Image source={{ uri: item?.uri }} style={{
                                                height: 200,
                                                width: 200,
                                                borderRadius: 12,

                                            }} blurRadius={10} />


                                        </View>
                                        <View style={{ borderRadius: 12, borderWidth: 0, borderColor: 'rgba(255, 255, 2555, 0.4)', overflow: 'hidden' }}>
                                            <Image source={{ uri: item?.uri }} style={{
                                                height: 200,
                                                width: 200,
                                                borderRadius: 12,

                                            }} />
                                        </View>
                                        <Text style={styles.nameSong} numberOfLines={1}>{item?.name}</Text>
                                        <Text style={styles.nameSinger} numberOfLines={1}>{item?.singer}</Text>


                                    </View>
                                </Link>
                            );
                        }}
                    />}

                </View>
            </View>
            <BottomPlaying />



        </View>

    );
}

export default Home;
