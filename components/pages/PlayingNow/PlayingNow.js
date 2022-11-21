import { useContext, useState } from 'react';
import { Image, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { MusicContext } from '../../../context/MusicContext';
import { Link } from 'react-router-native';
import styles from './PlayingNow.module.scss';

// link hướng dẫn : https://www.youtube.com/watch?v=fOtCxD3AodY
// link npm : https://www.npmjs.com/package/@react-native-community/slider
import Slider from '@react-native-community/slider';

// link get icon: https://icons.expo.fyi/
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

export default function PlayingNow() {

    const context = useContext(MusicContext);

    const { song, play, status, playMusic, timeMusic, onChangeMusicTime,sound } = context;



    const [isMute, setIsMute] = useState(true);





    return (
        <SafeAreaView style={[{ paddingTop: STATUSBAR_HEIGHT }, styles.container]}>
            <View style={styles.header}>
                <Link to="/" style={styles.back}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </Link>
                <View style={styles.bgTitle}>
                    <Text style={styles.title}>Playing Now</Text>
                </View>
            </View>
            <View style={styles.contain}>
                <View style={styles.contentImage}>
                    <Image style={[{ resizeMode: 'contain' }, styles.image]} source={{ uri: song.uri }} />
                    <Text style={styles.nameSong}>{song?.name}</Text>
                    <Text style={styles.nameSinger}>{song?.singer}</Text>
                </View>
                <View style={styles.contentAction}>
                    <View style={styles.listIcon}>
                        <TouchableOpacity onPress={() => setIsMute(!isMute)}>
                            <Feather style={styles.icon} name={isMute ? 'volume-1' : 'volume-x'} size={24} />
                        </TouchableOpacity>
                        <View style={styles.listIconRight}>
                            <TouchableOpacity style={styles.iconRight}>
                                <MaterialIcons style={styles.icon} name="loop" size={24} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconRight}>
                                <Ionicons style={styles.icon} name="share-social" size={24} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.timeMusic]}>
                        <View style={[styles.bgTime]}>
                            <Text style={styles.time}>{timeMusic?.remainingTime?.mins}:{timeMusic?.remainingTime?.secs}</Text>
                            <Text style={styles.time}>{timeMusic?.durationTime?.mins}:{timeMusic?.durationTime?.secs}</Text>
                        </View>
                        <Slider
                            style={{ width: '100%', height: 40 }}
                            value={status}
                            minimumValue={0}
                            maximumValue={100}
                            thumbTintColor="#FFFFFF"
                            minimumTrackTintColor="#FFFFFF"
                            maximumTrackTintColor="#000000"
                            onSlidingComplete={onChangeMusicTime}
                            onSlidingStart={async () => {
                                await sound.pauseAsync();
                            }}
                        />
                    </View>
                    <View style={styles.actionMusic}>
                        <TouchableOpacity>
                            <Feather name="skip-back" size={36} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => playMusic(song)}>
                            <Feather name={play ? 'pause' : 'play'} size={36} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Feather name="skip-forward" size={36} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
