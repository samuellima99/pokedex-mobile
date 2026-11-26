import { View, Text, StyleSheet } from "react-native";
import type { Stat } from "../api";
import { MAX_STAT, statInfo } from "../utils";
import { colors, fonts, radius } from "../theme";

type Props = {
  stat: Stat;
};

// TODO Questão 05
export default function StatBar({ stat }: Props) {
  return null;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 10,
  },
  label: {
    width: 100,
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.textSecondary,
  },
  value: {
    width: 34,
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.text,
    textAlign: "right",
  },
  track: {
    flex: 1,
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceSoft,
  },
  fill: { height: 8, borderRadius: radius.pill },
});
