import { useCallback, useContext, useMemo, useState } from 'react';
import { Text, View, Image, FlatList, AppRegistry, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import { MusicContext } from '../../../context/MusicContext';
import BottomPlaying from '../../Layout';
import styles from './ListMusic.module.scss';
import { Ionicons } from '@expo/vector-icons';
import { OptimizedFlatList } from 'react-native-optimized-flatlist';

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



    const handlePushData = async (item) => {
        await sound.setStatusAsync({ shouldPlay: false });
        setNextPlay(true);
        setPlay(true)
        setSong(item);
    };

    const get20DataInSong = () => {
        // setListMusic(songsData?.slice(indexLoadSongs * 20, (indexLoadSongs + 1) * 20));
        // setIndexLoadSongs(indexLoadSongs + 1);
        // console.log("run");
    }


    // render item function, outside from class's `render()`
    const renderItem = ({ item }) => ((

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

    const memoizedValue = useMemo(() => renderItem, [listMusic]);

    const keyExtractor = useCallback(item => item.id.toString(), []);

    const getItemLayout = useCallback(
        (data, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
        }), []
    )



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
                {/* <FlatList
                    keyExtractor={keyExtractor}
                    data={listMusic}
                    renderItem={memoizedValue}
                    getItemLayout={getItemLayout}
                    // Performance settings
                    removeClippedSubviews={true} // Unmount components when outside of window 
                    initialNumToRender={6} // Reduce initial render amount
                    maxToRenderPerBatch={8} // Reduce number in each render batch
                    updateCellsBatchingPeriod={100} // Increase time between renders
                    windowSize={15} // Reduce the window size
                    onEndReached={get20DataInSong}
                    onEndReachedThreshold={0.5}
                /> */}

                <ScrollView>
                    {songsData?.map(item => (<TouchableOpacity key={item.id}
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




                    </TouchableOpacity>))

                    }
                </ScrollView>
            </View>
            {/* <View style={{flex:0.2}}>
                <Text style={styles.recommend}>playlist</Text>
            </View> */}
            <BottomPlaying />
        </View>
    );
}

export default ListMusic;
