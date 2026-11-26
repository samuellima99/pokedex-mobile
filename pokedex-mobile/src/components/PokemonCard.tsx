import { Pressable, Image, Text, View, StyleSheet } from "react-native";
import type { PokemonSummary } from "../api";
import TypeBadge from "./TypeBadge";
import { formatName, formatNumber } from "../utils";
import { colors, fonts, radius, shadow } from "../theme";

type Props = {
  pokemon: PokemonSummary;
  onPress: () => void;
};

export default function PokemonCard({ pokemon, onPress }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
    >
      <Image
        source={pokemon.sprite}
        style={styles.sprite}
        resizeMode="contain"
      />
      <Text style={styles.number}>{formatNumber(pokemon.id)}</Text>
      <Text style={styles.name} numberOfLines={1}>
        {formatName(pokemon.name)}
      </Text>
      <View style={styles.types}>
        {pokemon.types.map((type) => (
          <TypeBadge key={type} type={type} />
        ))}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    alignItems: "center",
    marginTop: 44,
    marginBottom: 4,
    paddingTop: 48,
    paddingBottom: 18,
    paddingHorizontal: 8,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    ...shadow,
  },
  cardPressed: { transform: [{ scale: 0.96 }] },
  sprite: {
    position: "absolute",
    top: -40,
    left: "50%",
    marginLeft: -40,
    width: 80,
    height: 80,
  },
  number: { fontFamily: fonts.bold, fontSize: 12, color: colors.textMuted },
  name: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.text,
    marginTop: 2,
  },
  types: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 6,
    minHeight: 26,
    marginTop: 8,
  },
});
