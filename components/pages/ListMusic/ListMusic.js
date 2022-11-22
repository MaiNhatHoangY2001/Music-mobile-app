import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Text, View, Image, FlatList, AppRegistry, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Link } from 'react-router-native';
import { MusicContext } from '../../../context/MusicContext';
import BottomPlaying from '../../Layout';
import styles from './ListMusic.module.scss';
import { Ionicons } from '@expo/vector-icons';
import { OptimizedFlatList } from 'react-native-optimized-flatlist';
import { DataProvider, LayoutProvider, RecyclerListView } from 'recyclerlistview';

const ITEM_HEIGHT = 85;

function ListMusic() {

    const context = useContext(MusicContext);
    const songsData = context.songsData;
    const setSong = context.setSong;
    const setNextPlay = context.setNextPlay;
    const sound = context.sound;
    const setPlay = context.setPlay;
    const [listMusic, setListMusic] = useState(songsData?.slice(0, 20));
    const [indexLoadSongs, setIndexLoadSongs] = useState(0);

    const [dataProvider, setDataProvider] = useState(new DataProvider((r1, r2) => {
        return r1 !== r2;
    }))





    const handlePushData = async (item) => {
        await sound.setStatusAsync({ shouldPlay: false });
        // setNextPlay(true);
        setPlay(false)
        setSong(item);
    };




    const rowRenderer = (type, item) => ((

        <TouchableOpacity key={item.id}
            style={{
                flexDirection: 'row',
                margin: 15,
            }} onPress={() => handlePushData(item)}>
            <Image source={{ uri: item.uri }} style={{ height: 55, width: 55, borderRadius: 12 }} />
            <View style={{ flexDirection: 'column' }}>
                <Text style={styles.nameSong}>{item.name}</Text>
                <Text style={styles.nameSinger}>{item.singer}</Text>
            </View>
            {/* <View style={{ flexDirection: 'column', flex: 0.1 }}>
                <TouchableOpacity>
                    <Ionicons name="ellipsis-vertical" size={30} color="rgba(137, 150, 184, 0.6);" />
                </TouchableOpacity>
            </View> */}




        </TouchableOpacity>
    )
    );



    useEffect(() => {
        setDataProvider(dataProvider.cloneWithRows(songsData));
    }, [songsData])

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
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

            <View style={{ flexDirection: 'row', flex: 0.1, marginLeft: -235 }}>
                <Text style={styles.recommend}>List Songs</Text>
            </View>

            <View style={{ flex: 0.75, width: "100%", alignSelf: 'flex-start' }}>


                <RecyclerListView
                    dataProvider={dataProvider}
                    layoutProvider={new LayoutProvider(i => 'audio',
                        (type, dim) => {
                            switch (type) {
                                case 'audio':
                                    dim.width = Dimensions.get("window").width;
                                    dim.height = 70;
                                    break;
                                default:
                                    dim.width = 0;
                                    dim.height = 0;
                            }
                        })}
                    rowRenderer={rowRenderer}
                />


            </View>

            {/* <View style={{flex:0.2}}>
                <Text style={styles.recommend}>playlist</Text>
            </View> */}
            <BottomPlaying />
        </View>
    );
}

export default ListMusic;
