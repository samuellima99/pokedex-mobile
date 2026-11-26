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
  // sprite pode vir como pokemon.sprite ou pokemon.sprites
  const spriteSource =
    // caso exista sprite
    (pokemon as any).sprite ??
    // caso exista sprites (PokeAPI costuma ser sprites: { other: { ... } })
    (pokemon as any).sprites?.other?.["official-artwork"]?.front_default ??
    (pokemon as any).sprites?.front_default ??
    undefined;

  // normaliza types pra array de string
  const types = (() => {
    const t = (pokemon as any).types;
    if (!t) return [];

    // types: string[]
    if (Array.isArray(t) && typeof t[0] === "string") return t;

    // types: [{ type: { name: string } }]
    if (
      Array.isArray(t) &&
      t[0] &&
      typeof t[0] === "object" &&
      t[0].type?.name
    ) {
      return t.map((x: any) => x.type.name);
    }

    return [];
  })();

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
    >
      {spriteSource ? (
        <Image
          source={{ uri: spriteSource }}
          style={styles.sprite}
          resizeMode="contain"
        />
      ) : (
        <View style={styles.sprite} />
      )}

      <Text style={styles.number}>{formatNumber((pokemon as any).id)}</Text>

      <Text style={styles.name} numberOfLines={1}>
        {formatName((pokemon as any).name)}
      </Text>

      <View style={styles.types}>
        {types.map((t) => (
          <TypeBadge key={t} type={t} />
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
