import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { greeting } from '.'

export default function App() {
    return (
        <View style={styles.container}>
            <Text>{greeting}</Text>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6933dccf',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
