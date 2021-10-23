import React from 'react';
import { View } from "react-native";
import { useAuth } from "../../hooks/auth";
import { Button } from "../Button";
import { styles } from "./styles";
import { COLORS } from "../../theme";

export function SignInBox() {
    const { signIn, isSigningIn } = useAuth();
    return (
      <View style={styles.container}>
            <Button
                color={COLORS.BLACK_PRIMARY}
                backgroundColor={COLORS.YELLOW}
                title="ENTRAR COM O GITHUB"
                icon="github"
                onPress={signIn}
                isLoading={isSigningIn}
            />
      </View>
    );
}
