import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppWrapper from './components/AppWrapper';
import { MusicContextProvider } from './context/MusicContext';

export default function App() {
    return (<MusicContextProvider>
        <AppWrapper />
    </MusicContextProvider>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
