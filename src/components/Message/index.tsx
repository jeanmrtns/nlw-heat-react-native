import React from 'react';
import { View, Text } from "react-native";
import { MotiView } from 'moti';
import {styles} from "./styles";
import {UserPhoto} from "../UserPhoto";

export interface IMessage {
    id: string;
    text: string;
    user: {
        name: string;
        avatar_url: string
    }
}

type MessageProps = {
    data: IMessage
}

export function Message({ data } : MessageProps) {
    return (
        <MotiView
            from={{ opacity: 0, translateY: -50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 700 }}
            style={styles.container}>
            <Text style={styles.message}>{ data.text }</Text>

            <View style={styles.footer}>
                <UserPhoto sizes={'SMALL'} imageUri={ data.user.avatar_url } />
                <Text style={styles.userName}>{ data.user.name }</Text>
            </View>
        </MotiView>
    )
}