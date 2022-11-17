import { createContext, useState } from 'react';

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

function MusicContextProvider({ children }) {
    const [song, setSong] = useState({
        id: -1,
        name: '',
        singer: '',
        uri: 'https://i.ytimg.com/vi/4tYuIU7pLmI/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAhceTIdT6zizuSKJXqXtmbHU1olw',
        mp3: '',
    });

    const contextValues = { song, setSong, data };

    return <MusicContext.Provider value={contextValues}>{children}</MusicContext.Provider>;
}

export { MusicContextProvider, MusicContext };
