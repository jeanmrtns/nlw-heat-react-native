import React from 'react';
import { ScrollView } from 'react-native';
import { Message } from "../Message";
import { styles } from "./styles";

export function MessageList() {

    const data = {
        id: '122k1jl3k1',
        text: 'Hello world!',
        user: {
            name: 'Jean Martins',
            avatar_url: 'https://github.com/jeanmrtns.png'
        }
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="never">
            <Message data={ data } />
        </ScrollView>
    )
}