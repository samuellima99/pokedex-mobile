import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  FlatList,
  StyleSheet,
} from "react-native";
import Loading from "../../components/Loading";
import Pokeball from "../../components/Pokeball";
import PokemonCard from "../../components/PokemonCard";
import { TYPE_NAMES, typeInfo } from "../../utils";
import {
  colors,
  fonts,
  radius,
  shadow,
  strongShadow,
  TOP_SPACE,
} from "../../theme";
import { usePokedexViewModel } from "./usePokedexViewModel";

type Props = {
  onSelect: (id: number) => void;
};

function SearchIcon() {
  return (
    <View style={styles.searchIcon}>
      <Pokeball size={22} color={colors.surface} />
    </View>
  );
}

export default function PokedexScreen({ onSelect }: Props) {
  const {
    search,
    setSearch,
    selectedType,
    setSelectedType,
    filteredPokemons,
    loading,
    error,
    retry,
  } = usePokedexViewModel();

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <View style={styles.toolbarTop}>
          <View style={styles.logo}>
            <Pokeball size={32} />
            <Text style={styles.logoText}>Pokédex</Text>
          </View>
          <Text style={styles.count}>
            <Text style={styles.countNumber}>{filteredPokemons.length}</Text>{" "}
            Pokémon
          </Text>
        </View>

        <View style={styles.searchBar}>
          <TextInput
            style={styles.input}
            placeholder="Buscar Pokémon pelo nome"
            placeholderTextColor={colors.textMuted}
            value={search}
            onChangeText={setSearch}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <SearchIcon />
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chips}
        contentContainerStyle={styles.chipsContent}
      >
        <Pressable
          style={[styles.chip, selectedType === "" && styles.chipAll]}
          onPress={() => setSelectedType("")}
        >
          <Text
            style={[styles.chipText, selectedType === "" && styles.chipAllText]}
          >
            Todos
          </Text>
        </Pressable>

        {TYPE_NAMES.map((type) => {
          const info = typeInfo(type);
          const active = selectedType === type;
          return (
            <Pressable
              key={type}
              style={[
                styles.chip,
                active && {
                  backgroundColor: info.color,
                  borderColor: info.color,
                },
              ]}
              onPress={() => setSelectedType(type)}
            >
              {active ? null : (
                <View style={[styles.dot, { backgroundColor: info.color }]} />
              )}
              <Text style={[styles.chipText, active && styles.chipActiveText]}>
                {info.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {loading ? (
        <Loading text="Carregando Pokédex..." />
      ) : error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={retry}>
            <Text style={styles.retryText}>Tentar de novo</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={filteredPokemons}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <PokemonCard pokemon={item} onPress={() => onSelect(item.id)} />
          )}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Pokeball size={56} color={colors.textMuted} />
              <Text style={styles.emptyText}>Nenhum Pokémon encontrado.</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: TOP_SPACE },
  toolbar: {
    marginHorizontal: 20,
    padding: 16,
    paddingBottom: 14,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    ...strongShadow,
  },
  toolbarTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  logo: { flexDirection: "row", alignItems: "center", gap: 10 },
  logoText: {
    fontFamily: fonts.extrabold,
    fontSize: 24,
    letterSpacing: -0.5,
    color: colors.text,
  },
  count: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textSecondary,
  },
  countNumber: { fontFamily: fonts.bold, fontSize: 18, color: colors.text },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 50,
    paddingLeft: 16,
    paddingRight: 5,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceSoft,
  },
  input: {
    flex: 1,
    alignSelf: "stretch",
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.text,
    outlineStyle: "solid", // removes the focus ring on Expo Web
    outlineWidth: 0,
  },
  searchIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 7,
    elevation: 4,
  },
  chips: { flexGrow: 0, flexShrink: 0, marginTop: 14 },
  chipsContent: { gap: 8, paddingHorizontal: 20, paddingVertical: 2 },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
  },
  chipText: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.textSecondary,
  },
  chipActiveText: { fontFamily: fonts.bold, color: colors.badgeText },
  chipAll: { borderColor: colors.text, backgroundColor: colors.text },
  chipAllText: { fontFamily: fonts.bold, color: colors.surface },
  dot: { width: 10, height: 10, borderRadius: 5 },
  errorBox: {
    alignItems: "flex-start",
    gap: 12,
    margin: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.dangerBorder,
    borderRadius: 14,
    backgroundColor: colors.dangerSoft,
  },
  errorText: { fontFamily: fonts.medium, fontSize: 14, color: colors.danger },
  retryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    ...shadow,
  },
  retryText: { fontFamily: fonts.bold, fontSize: 14, color: colors.text },
  list: { paddingHorizontal: 20, paddingTop: 4, paddingBottom: 40 },
  row: { justifyContent: "space-between" },
  empty: { alignItems: "center", gap: 14, paddingVertical: 64, opacity: 0.8 },
  emptyText: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: colors.textSecondary,
  },
});
