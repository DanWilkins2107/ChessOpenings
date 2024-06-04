import React from 'react';
import { Text, View } from 'react-native';

const MessageBox = ({ message, backgroundColor, textColor }) => {
    return (
        <View style={{ backgroundColor: backgroundColor, padding: 10, alignItems: 'center' }}>
            <Text style={{ fontSize: 18, color: textColor }}>{message}</Text>
        </View>
    );
};

export default MessageBox;