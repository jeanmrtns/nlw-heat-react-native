import React from 'react';
import { View, Text } from "react-native";
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
        <View style={styles.container}>
            <Text style={styles.message}>{ data.text }</Text>

            <View style={styles.footer}>
                <UserPhoto sizes={'SMALL'} imageUri={ data.user.avatar_url } />
                <Text style={styles.userName}>{ data.user.name }</Text>
            </View>
        </View>
    )
}