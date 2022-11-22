import { useContext } from 'react';
import { Text, View, Image, FlatList, AppRegistry, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';
import { MusicContext } from '../../../context/MusicContext';
import BottomPlaying from '../../Layout';
import styles from './ListMusic.module.scss';
import { Ionicons } from '@expo/vector-icons';

function ListMusic() {
    const songs = [
        {
            id: 1,
            name: 'Beliver',
            singer: 'IMAGINE DRAGON',
            img: require('./image/beliver.jpg'),
            url: 'https://res.cloudinary.com/dh0i5v2tb/video/upload/v1668613051/LTDDNC/Imagine_Dragons_Birds_Audio_ft_Elisa_320kbps_fpqjvs.mp3',
        },
        {
            id: 2,
            name: 'Shortwave',
            singer: 'RYAN GRIDRY',
            img: require('./image/shortwave.jpg'),
            url: 'https://res.cloudinary.com/dh0i5v2tb/video/upload/v1668613051/LTDDNC/Imagine_Dragons_Birds_Audio_ft_Elisa_320kbps_fpqjvs.mp3',
        },
        {
            id: 3,
            name: 'Dream On',
            singer: 'ROGGER TERRY',
            img: require('./image/dreamon.jpg'),
            url: 'https://res.cloudinary.com/dh0i5v2tb/video/upload/v1668613051/LTDDNC/Imagine_Dragons_Birds_Audio_ft_Elisa_320kbps_fpqjvs.mp3',
        },
        {
            id: 4,
            name: 'Origins',
            singer: 'IMAGINE DRAGON',
            img: require('./image/Origins.png'),
            url: 'https://res.cloudinary.com/dh0i5v2tb/video/upload/v1668613051/LTDDNC/Imagine_Dragons_Birds_Audio_ft_Elisa_320kbps_fpqjvs.mp3',
        },
        {
            id: 5,
            name: 'Tie Me Down',
            singer: 'GRYFFIN',
            img: require('./image/tiemedown.jpg'),
            url: 'https://res.cloudinary.com/dh0i5v2tb/video/upload/v1668613051/LTDDNC/Imagine_Dragons_Birds_Audio_ft_Elisa_320kbps_fpqjvs.mp3',
        },
        {
            id: 6,
            name: 'Birds',
            singer: 'IMAGINE DRAGON',
            img: require('./image/birds.jpg'),
            url: 'https://res.cloudinary.com/dh0i5v2tb/video/upload/v1668613051/LTDDNC/Imagine_Dragons_Birds_Audio_ft_Elisa_320kbps_fpqjvs.mp3',
        },
        {
            id: 7,
            name: 'Title',
            singer: 'MEGHAN TRAINOR',
            img: require('./image/tittle.jpg'),
            url: 'https://res.cloudinary.com/dh0i5v2tb/video/upload/v1668613051/LTDDNC/Imagine_Dragons_Birds_Audio_ft_Elisa_320kbps_fpqjvs.mp3',
        },
        {
            id: 8,
            name: 'Sorry',
            singer: 'JUSTIN BIEBER',
            img: require('./image/sorry.png'),
            url: 'https://res.cloudinary.com/dh0i5v2tb/video/upload/v1668613051/LTDDNC/Imagine_Dragons_Birds_Audio_ft_Elisa_320kbps_fpqjvs.mp3',
        },
        {
            id: 9,
            name: 'How Long',
            singer: 'CHARLIE PUTH',
            img: require('./image/howlong.jpg'),
            url: 'https://res.cloudinary.com/dh0i5v2tb/video/upload/v1668613051/LTDDNC/Imagine_Dragons_Birds_Audio_ft_Elisa_320kbps_fpqjvs.mp3',
        },
        {
            id: 10,
            name: 'Beautiful Now',
            singer: 'ZEDD',
            img: require('./image/beautiful.jpg'),
            url: 'https://res.cloudinary.com/dh0i5v2tb/video/upload/v1668613051/LTDDNC/Imagine_Dragons_Birds_Audio_ft_Elisa_320kbps_fpqjvs.mp3',
        },
    ];
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', flex: 0.2, marginTop: 15 }}>
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

            <View style={{ flexDirection: 'row', flex: 0.1, marginTop: -70, marginLeft: -235 }}>
                <Text style={styles.recommend}>List Songs</Text>
            </View>

            <View style={{ flex: 0.6, width:"100%", alignSelf:'flex-start' }}>
                <FlatList key={'#'}
                    data={songs}
                    renderItem={({ item, index }) => {
                        return (
                            <View
                                style={{
                                    margin: 15,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 1, height: 1 },
                                    shadowOpacity: 0.4,
                                    shadowRadius: 3,
                                    elevation: 5,
                                }}
                            >
                                <View style={{flexDirection:'row'}}>
                                    <View style={{flexDirection:'column',flex:0.25}}>
                                        <Image source={item.img} style={{ height: 55, width: 55, borderRadius: 12 }} />
                                    </View>
                                    <View style={{flexDirection:'column', flex:0.99}}>
                                        <Text style={styles.nameSong}>{item.name}</Text>
                                        <Text style={styles.nameSinger}>{item.singer}</Text>
                                    </View>
                                    <View style={{flexDirection:'column',flex:0.1}}>
                                        <TouchableOpacity>
                                            <Ionicons name="ellipsis-vertical" size={30} color="rgba(137, 150, 184, 0.6);" />
                                        </TouchableOpacity>
                                    </View>
                                </View>    
                            </View>
                        );
                    }}
                ></FlatList>
            </View>
            {/* <View style={{flex:0.2}}>
                <Text style={styles.recommend}>playlist</Text>
            </View> */}
            <BottomPlaying />
        </View>
    );
}

export default ListMusic;
