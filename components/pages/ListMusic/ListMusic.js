import { Text, View, Image, FlatList, AppRegistry } from 'react-native';
import { Link } from 'react-router-native';
import styles from './ListMusic.module.scss';

//import TrackPlayer from 'react-native-track-player'

// const TrackPlayerInit = async () => {
//     await TrackPlayer.setupPlayer()
//     await TrackPlayer.add(
//         {id:6, name:'Birds', singer:'IMAGINE DRAGON', img:require('./image/birds.jpg'), url:"https://res.cloudinary.com/dh0i5v2tb/video/upload/v1668613051/LTDDNC/Imagine_Dragons_Birds_Audio_ft_Elisa_320kbps_fpqjvs.mp3"}
//     )
//     return true;
// }

function ListMusic() {
    // const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
 
    // useEffect(() => {
    // const startPlayer = async () => {
    //     let isInit =  await trackPlayerInit();
    //     setIsTrackPlayerInit(isInit);
    // }
    // startPlayer();
    // }, []);

    // const onButtonPressed = () => {
    // TrackPlayer.play();
    // };

    const songs = [
        {id:1, name:'Beliver', singer:'IMAGINE DRAGON', img:require('./image/beliver.jpg'), url:"https://res.cloudinary.com/dh0i5v2tb/video/upload/v1668613051/LTDDNC/Imagine_Dragons_Birds_Audio_ft_Elisa_320kbps_fpqjvs.mp3"},
        {id:2, name:'Shortwave', singer:'RYAN GRIDRY', img:require('./image/shortwave.jpg'), url:"https://res.cloudinary.com/dh0i5v2tb/video/upload/v1668613051/LTDDNC/Imagine_Dragons_Birds_Audio_ft_Elisa_320kbps_fpqjvs.mp3"},
        {id:3, name:'Dream On', singer:'ROGGER TERRY', img:require('./image/dreamon.jpg'), url:"https://res.cloudinary.com/dh0i5v2tb/video/upload/v1668613051/LTDDNC/Imagine_Dragons_Birds_Audio_ft_Elisa_320kbps_fpqjvs.mp3"},
        {id:4, name:'Origins', singer:'IMAGINE DRAGON', img:require('./image/Origins.png'), url:"https://res.cloudinary.com/dh0i5v2tb/video/upload/v1668613051/LTDDNC/Imagine_Dragons_Birds_Audio_ft_Elisa_320kbps_fpqjvs.mp3"},
        {id:5, name:'Tie Me Down', singer:'GRYFFIN', img:require('./image/tiemedown.jpg'), url:"https://res.cloudinary.com/dh0i5v2tb/video/upload/v1668613051/LTDDNC/Imagine_Dragons_Birds_Audio_ft_Elisa_320kbps_fpqjvs.mp3"},
        {id:6, name:'Birds', singer:'IMAGINE DRAGON', img:require('./image/birds.jpg'), url:"https://res.cloudinary.com/dh0i5v2tb/video/upload/v1668613051/LTDDNC/Imagine_Dragons_Birds_Audio_ft_Elisa_320kbps_fpqjvs.mp3"}
    ]
    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row',flex:0.2,marginTop:15}}>
                <Link to="/">
                    <Text style={styles.link}>=</Text>
                </Link>
                <Image style={styles.imgIcon}
                        source={{uri:'https://res.cloudinary.com/dh0i5v2tb/image/upload/v1668608763/LTDDNC/adjust-horizontal-altB_ortpxd.png'}}/>
            </View>

            <View style={{flexDirection:'row', flex:0.1, marginTop:-70,marginLeft:-220}}>
                <Text style={styles.recommend}>Liked Songs</Text>
            </View>

            <View style={{flex:0.6}}>
                <FlatList 
                    numColumns={2}
                    data={songs}
                    renderItem={({item,index}) => {
                        return(
                            <View style={{  margin:15, 
                                            shadowColor: '#000',
                                            shadowOffset: { width: 1, height: 1 },
                                            shadowOpacity: 0.4,
                                            shadowRadius: 3,
                                            elevation: 5,}}>
                                <Image source={item.img} style={{height:200, width:170,borderRadius:12}}/>
                                <Text style={styles.nameSong}>{item.name}</Text>
                                <Text style={styles.nameSinger}>{item.singer}</Text>
                            </View>
                        )
                    }}>

                </FlatList>
            </View>
            {/* <View style={{flex:0.2}}>
                <Text style={styles.recommend}>playlist</Text>
            </View> */}
        </View>
    );
}

export default ListMusic;
