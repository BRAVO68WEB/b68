import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import "react-native-gesture-handler";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { useLoadedAssets } from "./hooks/useLoadedAssets";
import Navigation from "./navigation";
import { useColorScheme } from "react-native";

export default function App() {
    // return (
    //     <View style={styles.container}>
    //         <Text>{greeting}</Text>
    //         <StatusBar style="auto" />
    //     </View>
    // )
    const isLoadingComplete = useLoadedAssets();
    const colorScheme = useColorScheme();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
        <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
        </SafeAreaProvider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6933dccf',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
