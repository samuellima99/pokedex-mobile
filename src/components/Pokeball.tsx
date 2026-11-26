import { View, type StyleProp, type ViewStyle } from "react-native";

type Props = {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

const RED = "#FF5350";
const DARK = "#0B1A3A";
const WHITE = "#FFFFFF";

export default function Pokeball({ size = 24, color, style }: Props) {
  const line = Math.max(2, Math.round(size * 0.07));
  const inner = size - line * 2;
  const button = Math.round(size * 0.36);
  const lineColor = color ?? DARK;
  const fill = color ? "transparent" : WHITE;

  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: line,
          borderColor: lineColor,
          backgroundColor: fill,
          overflow: "hidden",
        },
        style,
      ]}
    >
      {color ? null : (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: inner / 2,
            backgroundColor: RED,
          }}
        />
      )}
      <View
        style={{
          position: "absolute",
          top: (inner - line) / 2,
          left: 0,
          width: (inner - button) / 2 + line,
          height: line,
          backgroundColor: lineColor,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: (inner - line) / 2,
          right: 0,
          width: (inner - button) / 2 + line,
          height: line,
          backgroundColor: lineColor,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: (inner - button) / 2,
          left: (inner - button) / 2,
          width: button,
          height: button,
          borderRadius: button / 2,
          borderWidth: line,
          borderColor: lineColor,
          backgroundColor: fill,
        }}
      />
    </View>
  );
}
