import { useEffect, useState } from "react";
import { fetchPokemonList, type PokemonSummary } from "../../api";

export function usePokedexViewModel() {
  const [pokemons, setPokemons] = useState<PokemonSummary[]>([]);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState(""); // "" = Todos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPokemonList();
      setPokemons(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const text = search.trim().toLowerCase();

  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesName = pokemon.name.includes(text);
    const matchesType =
      selectedType === "" || pokemon.types.includes(selectedType);
    return matchesName && matchesType;
  });

  return {
    search,
    setSearch,
    selectedType,
    setSelectedType,
    filteredPokemons,
    loading,
    error,
    retry: load,
  };
}