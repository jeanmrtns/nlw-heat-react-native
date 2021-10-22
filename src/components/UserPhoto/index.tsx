import React from 'react';
import { Image } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import avatarImg from '../../assets/avatar.png'
import {SIZES, styles} from "./styles";
import {COLORS} from "../../theme";

interface IUserPhoto {
    imageUri: string | undefined;
    sizes?: 'SMALL' | 'NORMAL';
}

const AVATAR_DEFAULT  = Image.resolveAssetSource(avatarImg).uri;

export function UserPhoto({ imageUri, sizes = 'NORMAL' } : IUserPhoto) {

    const { containerSize, avatarSize } = SIZES[sizes];

    return (
        <LinearGradient
            colors={[COLORS.PINK, COLORS.YELLOW]}
            start={{ x: 0, y: 0.8 }}
            end={{ x: 0.9, y: 1 }}
            style={[
                styles.container,
                {
                    width: containerSize,
                    height: containerSize,
                    borderRadius: containerSize / 2
                }
            ]}
        >
            <Image style={[styles.avatar, {
                width: avatarSize,
                height: avatarSize,
                borderRadius: avatarSize / 2
            }]} source={{ uri: imageUri || AVATAR_DEFAULT }} />
        </LinearGradient>

    )
}