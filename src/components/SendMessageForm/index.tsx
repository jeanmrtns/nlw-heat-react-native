import React, { useState } from 'react';
import {View, TextInput, Alert, Keyboard} from "react-native";
import { styles } from "./styles";
import {Button} from "../Button";
import {COLORS} from "../../theme";
import { api } from "../../services/api";

export function SendMessageForm() {

    const [message, setMessage] = useState('');
    const [sendingMessage, setSendingMessage] = useState(false);

    async function handleMessageSubmit() {
        const messageFormatted = message.trim();

        if(messageFormatted.length > 0) {
            setSendingMessage(true);
            await api.post('/messages', { message: messageFormatted });
            setMessage('');
            Keyboard.dismiss();
            setSendingMessage(false);
            Alert.alert('Mensagem enviada com sucesso!');
        } else {
            Alert.alert('Escreva a mensagem para enviar.');
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                keyboardAppearance="dark"
                placeholder="Qual sua expectativa para o evento?"
                placeholderTextColor={COLORS.GRAY_PRIMARY}
                multiline
                onChangeText={setMessage}
                value={message}
                maxLength={140}
                editable={!sendingMessage}
            />

            <Button
                title="ENVIAR MENSAGEM"
                color={COLORS.WHITE}
                backgroundColor={COLORS.PINK}
                isLoading={sendingMessage}
                onPress={handleMessageSubmit}
            />
        </View>
    )
}