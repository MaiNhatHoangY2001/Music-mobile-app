import { useContext } from 'react';
import { Text, View, Image, FlatList } from 'react-native';
import { Link } from 'react-router-native';
import { MusicContext } from '../../../context/MusicContext';
import styles from './Home.module.scss';
import BottomPlaying from '../../Layout';



function Home() {


    const context = useContext(MusicContext);
    const setSong = context.setSong;
    const songs = context.data;



    const handlePushData = (item) => {
        setSong(item);
    };

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
                    <FlatList
                        horizontal
                        data={songs}
                        renderItem={({ item, index }) => {
                            return (
                                <Link key={index} to="/playing-now" onPress={() => handlePushData(item)}>
                                    <View
                                        style={styles.listSong}
                                    >

                                        <View style={{ elevation: 20, shadowColor: "red", position: 'absolute', top: 10, left: 10, borderRadius: 12, borderColor: 'rgba(255, 255, 2555, 0.4)', overflow: 'hidden' }}>
                                            <Image source={{ uri: item.uri }} style={{
                                                height: 200,
                                                width: 200,
                                                borderRadius: 12,

                                            }} blurRadius={10} />


                                        </View>
                                        <View style={{ borderRadius: 12, borderWidth: 0, borderColor: 'rgba(255, 255, 2555, 0.4)', overflow: 'hidden' }}>
                                            <Image source={{ uri: item.uri }} style={{
                                                height: 200,
                                                width: 200,
                                                borderRadius: 12,

                                            }} />
                                        </View>





                                        <Text style={styles.nameSong}>{item.name}</Text>
                                        <Text style={styles.nameSinger}>{item.singer}</Text>


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

                <View >
                    <FlatList
                        horizontal
                        data={songs}
                        renderItem={({ item, index }) => {
                            return (
                                <Link key={index} to="/playing-now" onPress={() => handlePushData(item)}>
                                    <View
                                        style={styles.listSong}
                                    >



                                        <View style={{ elevation: 20, shadowColor: "red", position: 'absolute', top: 10, left: 10, borderRadius: 12, borderColor: 'rgba(255, 255, 2555, 0.4)', overflow: 'hidden' }}>
                                            <Image source={{ uri: item.uri }} style={{
                                                height: 200,
                                                width: 200,
                                                borderRadius: 12,

                                            }} blurRadius={10} />


                                        </View>
                                        <View style={{ borderRadius: 12, borderWidth: 0, borderColor: 'rgba(255, 255, 2555, 0.4)', overflow: 'hidden' }}>
                                            <Image source={{ uri: item.uri }} style={{
                                                height: 200,
                                                width: 200,
                                                borderRadius: 12,

                                            }} />
                                        </View>
                                        <Text style={styles.nameSong}>{item.name}</Text>
                                        <Text style={styles.nameSinger}>{item.singer}</Text>


                                    </View>
                                </Link>
                            );
                        }}
                    ></FlatList>
                </View>
            </View>
            {/* <View style={styles.bottom}>

                <Slider
                    style={{ width: dimensions.width, flexDirection: "column" }}
                    value={50}
                    minimumValue={0}
                    maximumValue={100}
                    thumbTintColor="#FFFFFF"
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                />
                <View style={{ flexDirection: 'row', width: dimensions.width }}>

                    <Link to="/playing-now" onPress={() => handlePushData(song)} >
                        <View style={{ flexDirection: 'row', width: dimensions.width }}>
                            <Image source={{ uri: song.uri }} style={{
                                height: 80,
                                width: 80,

                            }} />
                            <View style={{ marginLeft: 10 }}>
                                <Text style={styles.nameSong}>{song.name}</Text>
                                <Text style={styles.nameSinger}>{song.singer}</Text>
                            </View>
                            <View style={styles.actionMusic}>
                                <TouchableOpacity>
                                    <Feather name="skip-back" size={SIZE_ACTION} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setPlay(!play)}>
                                    <Feather name={play ? 'pause' : 'play'} size={SIZE_ACTION} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Feather name="skip-forward" size={SIZE_ACTION} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>

                    </Link>
                </View>
            </View> */}
            <BottomPlaying />



        </View>

    );
}

export default Home;
