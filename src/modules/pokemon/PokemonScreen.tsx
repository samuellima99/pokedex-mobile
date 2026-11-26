import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import Loading from "../../components/Loading";
import Pokeball from "../../components/Pokeball";
import StatBar from "../../components/StatBar";
import TypeBadge from "../../components/TypeBadge";
import {
  formatHeight,
  formatName,
  formatNumber,
  formatWeight,
  sumStats,
  typeInfo,
} from "../../utils";
import { colors, fonts, radius, TOP_SPACE } from "../../theme";
import { usePokemonViewModel } from "./usePokemonViewModel";

type Props = {
  id: number;
  onBack: () => void;
};

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoBox}>
      <Text style={styles.infoLabel}>{label}</Text>
      <View style={styles.pill}>
        <Text style={styles.pillText}>{value}</Text>
      </View>
    </View>
  );
}

export default function PokemonScreen({ id, onBack }: Props) {
  const { pokemon, loading, error } = usePokemonViewModel(id);

  if (loading) {
    return (
      <View style={styles.screen}>
        <Loading text="Carregando Pokémon..." />
      </View>
    );
  }

  if (error || !pokemon) {
    return (
      <View style={[styles.screen, styles.center]}>
        <View style={styles.errorIcon}>
          <Text style={styles.errorIconText}>!</Text>
        </View>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.backLink} onPress={onBack}>
          <Text style={styles.backLinkText}>← Voltar para a lista</Text>
        </Pressable>
      </View>
    );
  }

  const color = typeInfo(pokemon.types[0]).color;
  const total = sumStats(pokemon.stats);

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <View style={[styles.hero, { backgroundColor: color }]}>
        <View style={[styles.glow, styles.glowLarge]} />
        <View style={[styles.glow, styles.glowSmall]} />
        <Pokeball size={260} color={colors.surface} style={styles.heroPokeball} />

        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backText}>←</Text>
        </Pressable>

        <Image source={pokemon.image} style={styles.image} />
        <Text style={styles.number}>{formatNumber(pokemon.id)}</Text>
        <Text style={styles.name}>{formatName(pokemon.name)}</Text>

        <View style={styles.types}>
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </View>
      </View>

      <View style={styles.details}>
        <Text style={styles.section}>Habilidades</Text>
        <View style={styles.abilities}>
          {pokemon.abilities.map((ability) => (
            <View key={ability} style={styles.pill}>
              <Text style={styles.pillText}>{formatName(ability)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.infoGrid}>
          <InfoBox label="Altura" value={formatHeight(pokemon.height)} />
          <InfoBox label="Peso" value={formatWeight(pokemon.weight)} />
          <InfoBox label="Exp. base" value={String(pokemon.baseExperience)} />
        </View>

        <Text style={styles.section}>Status base</Text>
        {pokemon.stats.map((stat) => (
          <StatBar key={stat.name} stat={stat} />
        ))}

        <View style={styles.total}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{total}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.surface },
  center: {
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: 32,
  },
  errorIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.dangerSoft,
  },
  errorIconText: { fontFamily: fonts.extrabold, fontSize: 30, color: colors.danger },
  errorText: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.text,
    textAlign: "center",
  },
  backLink: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
  },
  backLinkText: { fontFamily: fonts.semibold, fontSize: 14, color: colors.primary },
  hero: {
    alignItems: "center",
    paddingTop: TOP_SPACE + 8,
    paddingBottom: 28,
    paddingHorizontal: 24,
    overflow: "hidden",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  glow: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: colors.surface,
  },
  glowLarge: {
    top: TOP_SPACE - 30,
    width: 320,
    height: 320,
    borderRadius: 160,
    opacity: 0.16,
  },
  glowSmall: {
    top: TOP_SPACE + 20,
    width: 220,
    height: 220,
    borderRadius: 110,
    opacity: 0.24,
  },
  heroPokeball: {
    position: "absolute",
    right: -80,
    bottom: -80,
    opacity: 0.3,
    transform: [{ rotate: "-20deg" }],
  },
  backButton: {
    position: "absolute",
    top: TOP_SPACE - 8,
    left: 16,
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
  },
  backText: { fontFamily: fonts.bold, fontSize: 18, color: colors.text },
  image: {
    width: 220,
    height: 220,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  number: {
    marginTop: 8,
    fontFamily: fonts.bold,
    fontSize: 14,
    color: "rgba(11, 26, 58, 0.55)",
  },
  name: {
    fontFamily: fonts.extrabold,
    fontSize: 32,
    letterSpacing: -0.5,
    color: colors.text,
  },
  types: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    minHeight: 26,
    marginTop: 6,
  },
  details: { paddingHorizontal: 24, paddingTop: 26, paddingBottom: 40 },
  section: {
    marginBottom: 12,
    fontFamily: fonts.extrabold,
    fontSize: 13,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: colors.text,
  },
  abilities: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  pill: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceSoft,
  },
  pillText: { fontFamily: fonts.semibold, fontSize: 14, color: colors.text },
  infoGrid: { flexDirection: "row", gap: 10, marginTop: 22, marginBottom: 24 },
  infoBox: { flex: 1, gap: 8 },
  infoLabel: {
    fontFamily: fonts.extrabold,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: "uppercase",
    textAlign: "center",
    color: colors.text,
  },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: colors.text,
  },
  totalLabel: { fontFamily: fonts.semibold, fontSize: 14, color: colors.surface },
  totalValue: { fontFamily: fonts.bold, fontSize: 16, color: colors.surface },
});
