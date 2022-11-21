import { View } from 'react-native';
import { Route, Routes, NativeRouter } from 'react-router-native';
import { publicRoutes } from '../routes';

function AppWrapper() {
    return (
        <NativeRouter style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Routes style={{ flex: 1 }}>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        return <Route key={index} path={route.path} element={<Page />} />;
                    })}
                </Routes>
            </View>
        </NativeRouter>
    );
}

export default AppWrapper;
