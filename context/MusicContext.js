import { Audio } from 'expo-av';
import { createContext, useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { Alert } from 'react-native';

const MusicContext = createContext();

const data = [
    {
        id: 0,
        name: 'Cuối cùng thì',
        singer: 'Jack-J97',
        uri: 'https://i.ytimg.com/vi/red9YvYlPWg/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBoErx6c-b9WDDRaeB56MQ_J_2IJQ',
        mp3: 'https://res.cloudinary.com/dpux6zwj3/video/upload/v1668690709/Music/Jack_-_J97__Cuoi_Cung_Thi__Special_Stage_Video_mrir4c.mp3',
    },
    {
        id: 1,
        name: 'Ngôi Sao Cô Đơn',
        singer: 'Jack-J97',
        uri: 'https://i.ytimg.com/vi/4tYuIU7pLmI/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAhceTIdT6zizuSKJXqXtmbHU1olw',
        mp3: 'https://res.cloudinary.com/dpux6zwj3/video/upload/v1668691044/Music/JACK_-_J97__NGOI_SAO_CO_ON__OFFICIAL_MUSIC_VIDEO_aoio9a.mp3',
    },
    {
        id: 2,
        name: 'Muộn rồi mà sao còn',
        singer: 'Sơn Tùng MTP',
        uri: 'https://i.ytimg.com/vi/xypzmu5mMPY/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA-xo4-kATi9sfc2cMgV_7fSQ7_MQ',
        mp3: 'https://res.cloudinary.com/dpux6zwj3/video/upload/v1668691291/Music/SON_TUNG_M-TP__MUON_ROI_MA_SAO_CON__OFFICIAL_MUSIC_VIDEO_b0semu.mp3',
    },
    {
        id: 3,
        name: 'Theres No One At All',
        singer: 'Sơn Tùng MTP',
        uri: 'https://i.ytimg.com/vi/JHSRTU31T14/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAr1emCyOeK6TKeeVubpCZmJjIMVw',
        mp3: 'https://res.cloudinary.com/dpux6zwj3/video/upload/v1668691126/Music/SON_TUNG_M-TP__THERES_NO_ONE_AT_ALL_ANOTHER_VERSION__OFFICIAL_MUSIC_VIDEO_wuaf5o.mp3',
    },
];

const initValues = {
    timeMusic: {
        remainingTime: {
            hrs: "00", mins: "00", secs: "00", ms: "00"
        }, durationTime: {
            hrs: "00", mins: "00", secs: "00", ms: "00"
        }
    }
}

function MusicContextProvider({ children }) {
    const [songsData, setSongsData] = useState(data);
    const [song, setSong] = useState(songsData[0]);
    const [play, setPlay] = useState(false);
    const [sound, setSound] = useState(new Audio.Sound());
    const [status, setStatus] = useState(0);
    const [timeMusic, setTimeMusic] = useState(initValues.timeMusic);
    const [isPermissionError, setIsPermissionError] = useState(false);
    const [nextPlay, setNextPlay] = useState(false);

    const _onPlaybackStatusUpdate = async playbackStatus => {
        if (!playbackStatus.isLoaded) {
            // Update your UI for the unloaded state
            if (playbackStatus.error) {
                console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
                // Send Expo team the error on Slack or the forums so we can help you debug!
            }
        } else {
            // Update your UI for the loaded state

            if (playbackStatus.isPlaying) {
                // Update your UI for the playing state
                getStatus(playbackStatus);


            } else {
                // Update your UI for the paused state
            }

            if (playbackStatus.isBuffering) {
                // Update your UI for the buffering state
            }

            if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
                // The player has just finished playing and will stop. Maybe you want to play something else?
                let indexCurrentSong = songsData.findIndex(item => item.id === song.id);
                if (songsData.length > indexCurrentSong + 1) {
                    setNextPlay(true);
                    setSong(songsData[indexCurrentSong + 1]);
                    setPlay(true);
                } else {
                    setNextPlay(true);
                    setSong(songsData[0]);
                    setPlay(false);

                }
                setStatus(0);
            }

        }
    };

    const playMusic = async () => {
        if (play)
            await sound.pauseAsync();
        else
            await sound.playAsync();
        setPlay(!play);

    }

    const msToTime = (s) => {
        const ms = s % 1000;
        s = (s - ms) / 1000;
        const secs = s % 60;
        s = (s - secs) / 60;
        const mins = s % 60;
        const hrs = (s - mins) / 60;

        return {
            hrs, mins, secs, ms
        }
    }


    const getStatus = async (playbackStatus) => {

        const percentage = (playbackStatus.positionMillis / playbackStatus.durationMillis * 100);
        const remainingTime = msToTime(playbackStatus.positionMillis);
        const durationTime = msToTime(playbackStatus.durationMillis);
        if (!isNaN(percentage)) {
            setStatus(percentage);
        } else {
            setStatus(0);
        }
        setTimeMusic({ remainingTime, durationTime });
    }

    const onChangeMusicTime = async (value) => {
        setStatus(value);

        const statusMusic = await sound.getStatusAsync();


        await sound.setPositionAsync(value * statusMusic.durationMillis / 100);
        await sound.playAsync();
        setPlay(true);
    }

    const getPermission = async () => {
        // {
        //     "canAskAgain": true,
        //     "expires": "never",
        //     "granted": false,
        //     "status": "undetermined",
        //   }
        const permission = await MediaLibrary.getPermissionsAsync();
        if (permission.granted) {
            //    we want to get all the audio files
            getAudioFiles();
        }

        if (!permission.canAskAgain && !permission.granted) {
            setIsPermissionError(false);
        }

        if (!permission.granted && permission.canAskAgain) {
            const { status, canAskAgain } =
                await MediaLibrary.requestPermissionsAsync();
            if (status === 'denied' && canAskAgain) {
                //   we are going to display alert that user must allow this permission to work this app
                permissionAlert();
            }

            if (status === 'granted') {
                //    we want to get all the audio files
                getAudioFiles();
            }

            if (status === 'denied' && !canAskAgain) {
                //   we want to display some error to the user
                setIsPermissionError(false);
            }
        }
    };

    const permissionAlert = () => {
        Alert.alert('Permission Required', 'This app needs to read audio files!', [
            {
                text: 'I am ready',
                onPress: () => getPermission(),
            },
            {
                text: 'cancle',
                onPress: () => permissionAlert(),
            },
        ]);
    };

    const getAudioFiles = async () => {
        let media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
        });
        media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
            first: media.totalCount,
            sortBy: 'default'
        });

        const songs = media.assets.map((item, index) => {

            const arrayStringSplit = item.filename.replace('.mp3', '').replace('.MP3', '').replace("(Official Music Video)", '').split("-");
            const name = arrayStringSplit[0];
            const singer = arrayStringSplit[1];

            return {
                id: index,
                name: name,
                singer: singer ? singer : "Unknown",
                uri: 'https://res.cloudinary.com/day9lvjdb/image/upload/v1669026336/music-icon-mohammed-jabir-ap_lzicra.jpg',
                mp3: item.uri,
            }

        })
        setSongsData(songs);
        setSong(songs[0]);
    };

    const loadSong = async (song) => {
        const tempSound = new Audio.Sound();
        setStatus(0);
        setTimeMusic(initValues.timeMusic)

        if (nextPlay) {
            sound.unloadAsync();
            setPlay(true);
            await tempSound.loadAsync({
                uri: song.mp3
            }, { shouldPlay: true })
        }
        else {
            await tempSound.loadAsync({
                uri: song.mp3
            })
        }

        tempSound.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
        setSound(tempSound);
        setNextPlay(false);

    }



    useEffect(() => {
        if (!nextPlay) {
            sound.unloadAsync();
            setPlay(false);
        }
    }, [song]);

    useEffect(() => {
        getPermission();
    }, [])


    useEffect(() => {
        loadSong(song);
    }, [song])


    const contextValues = { song, setSong, data, play, setPlay, playMusic, sound, status, timeMusic, setStatus, onChangeMusicTime, songsData };
    if (isPermissionError)
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text style={{ fontSize: 25, textAlign: 'center', color: 'red' }}>
                    It looks like you haven't accept the permission.
                </Text>
            </View>
        );

    return <MusicContext.Provider value={contextValues}>{children}</MusicContext.Provider>;
}

export { MusicContextProvider, MusicContext };
