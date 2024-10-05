import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../styling';

export default function ProgressBar({ progress }) {
    return (
        <View style={styles.barWrapper}>
            <View style={[{ width: `${progress}%` }, styles.barInner]} />
        </View>
    );
}

const styles = StyleSheet.create({
    barWrapper: {
        height: 10,
        backgroundColor: Colors.card2,
        borderRadius: 5,
        overflow: 'hidden',
        flex: 1,
        marginHorizontal: 10,
    },
    barInner: {
        height: '100%',
        backgroundColor: Colors.text,
    },
});