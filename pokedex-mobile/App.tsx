import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import Pokeball from "./src/components/Pokeball";
import PokedexScreen from "./src/modules/pokedex/PokedexScreen";
import PokemonScreen from "./src/modules/pokemon/PokemonScreen";
import { colors } from "./src/theme";

export default function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("./assets/fonts/Poppins-ExtraBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Phone width, also on a big screen (Expo Web). */}
      <View style={styles.phone}>
        <Pokeball size={520} color={colors.text} style={styles.watermark} />

        {/* The list stays open behind the details, so the search is kept. */}
        <View style={[styles.screen, selectedId !== null && styles.hidden]}>
          <PokedexScreen onSelect={setSelectedId} />
        </View>

        {selectedId !== null ? (
          <PokemonScreen id={selectedId} onBack={() => setSelectedId(null)} />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.background,
  },
  phone: { flex: 1, width: "100%", maxWidth: 480, overflow: "hidden" },
  watermark: {
    position: "absolute",
    top: -200,
    left: -200,
    opacity: 0.04,
  },
  screen: { flex: 1 },
  hidden: { display: "none" },
});
