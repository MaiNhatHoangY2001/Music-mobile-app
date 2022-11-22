import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { createContext, useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { Alert } from 'react-native';

const MusicContext = createContext();


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
    const [songsData, setSongsData] = useState([]);
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
                actionMusic(true);
            }

        }
    };

    const actionMusic = (isNextSong) => {
        let indexCurrentSong = songsData.findIndex(item => item.id === song.id);

        if (isNextSong) {
            //next song
            if (songsData.length - 1 > indexCurrentSong + 1)
                updateSong(songsData[indexCurrentSong + 1], true)
            else
                updateSong(songsData[0], false)
        }
        else {
            //previous song
            if (indexCurrentSong - 1 >= 0)
                updateSong(songsData[indexCurrentSong - 1], true)
            else
                updateSong(songsData[songsData.length - 1], false)
        }

        setStatus(0);
    }

    const updateSong = (song, isPlay) => {
        setNextPlay(true);
        setSong(song);
        setPlay(isPlay);
    }

    const playMusic = async () => {
        if (play)
            await sound.setStatusAsync({ shouldPlay: false });
        else
            await sound.setStatusAsync({ shouldPlay: true });
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
        await sound.setStatusAsync({ shouldPlay: true });
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
                text: 'cancel',
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


        const filterMp3 = media.assets.filter(item => item.filename.search(/.mp3/i) > -1)
        const filterTone = filterMp3.filter(item => item.filename.search(/tone.mp3/i) === -1)

        const songs = filterTone.map((item, index) => {

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

        await sound.unloadAsync();

        const tempSound = new Audio.Sound();
        setStatus(0);
        setTimeMusic(initValues.timeMusic)
        await tempSound.loadAsync({
            uri: song?.mp3
        })
        if (nextPlay) {
            setPlay(true);
            await tempSound.setStatusAsync({ shouldPlay: true });
        }
        else
            await tempSound.setStatusAsync({ shouldPlay: false });


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

        // Audio.setAudioModeAsync({
        //     allowsRecordingIOS: false,
        //     staysActiveInBackground: true,
        //     interruptionModeIOS: InterruptionModeIOS.DuckOthers,
        //     playsInSilentModeIOS: true,
        //     shouldDuckAndroid: true,
        //     interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
        //     playThroughEarpieceAndroid: false
        // });
    }, [])


    useEffect(() => {
        if (song !== undefined) {
            loadSong(song);
        }
    }, [song])


    const contextValues = { song, setSong, play, setPlay, playMusic, sound, status, timeMusic, setStatus, onChangeMusicTime, songsData, actionMusic, setNextPlay, updateSong };
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
