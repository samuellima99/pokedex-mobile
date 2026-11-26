import { View, Text, StyleSheet } from "react-native";
import { typeInfo } from "../utils";
import { colors, fonts } from "../theme";

type Props = {
  type: string;
};

// TODO Questão 04
export default function TypeBadge({ type }: Props) {
  return (
    <View style={[styles.badge, { backgroundColor: typeInfo(type).color}]}>
      <Text style={styles.label}></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.9)",
  
  },
  label: {
    fontFamily: fonts.bold,
    fontSize: 10.5,
    letterSpacing: 0.3,
    textTransform: "uppercase",
    color: colors.badgeText,
  },
});
