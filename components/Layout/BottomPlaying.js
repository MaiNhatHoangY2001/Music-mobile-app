import Slider from "@react-native-community/slider";
import { useContext, useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { Link } from 'react-router-native';
import { MusicContext } from "../../context/MusicContext";
import styles from './BottomPlaying.module.scss';
import { Feather } from '@expo/vector-icons';
import { Audio } from "expo-av";


const SIZE_ACTION = 31

function BottomPlaying() {

    const dimensions = useWindowDimensions();
    const context = useContext(MusicContext);

    const song = context.song;
    const setSong = context.setSong;

    const play = context.play;
    const setPlay = context.setPlay;
    const playMusic = context.playMusic;
    




    const handlePushData = (item) => {
        setSong(item);
    };

   




    



    return <View style={styles.bottom}>

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
                        <TouchableOpacity onPress={() => playMusic(song)}>
                            <Feather name={play ? 'pause' : 'play'} size={SIZE_ACTION} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Feather name="skip-forward" size={SIZE_ACTION} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

            </Link>
        </View>
    </View>;
}

export default BottomPlaying;