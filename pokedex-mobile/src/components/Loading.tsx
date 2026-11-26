import { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Platform,
  Text,
  View,
  StyleSheet,
} from "react-native";
import Pokeball from "./Pokeball";
import { colors, fonts } from "../theme";

type Props = {
  text: string;
};

export default function Loading({ text }: Props) {
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 900,
        easing: Easing.linear,
        useNativeDriver: Platform.OS !== "web",
      }),
    );
    animation.start();
    return () => animation.stop();
  }, [spin]);

  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.center}>
      <Animated.View style={{ transform: [{ rotate }] }}>
        <Pokeball size={56} />
      </Animated.View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: 24,
  },
  text: { fontFamily: fonts.semibold, fontSize: 15, color: colors.textSecondary },
});
