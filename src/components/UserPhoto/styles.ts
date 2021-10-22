import { StyleSheet } from "react-native";
import { COLORS } from "../../theme";

export const SIZES = {
    SMALL: {
        containerSize: 32,
        avatarSize: 28,
    },
    NORMAL: {
        containerSize: 48,
        avatarSize: 42
    }
}

export const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        borderWidth: 2,
        borderColor: COLORS.BLACK_SECONDARY
    }
});