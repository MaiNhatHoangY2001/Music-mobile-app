import { createContext, useState } from 'react';

const MusicContext = createContext();

function MusicContextProvider({ children }) {
    const [num, setNum] = useState(0);

    const contextValues = { num, setNum };

    return <MusicContext.Provider value={contextValues}>{children}</MusicContext.Provider>;
}

export { MusicContextProvider, MusicContext };
