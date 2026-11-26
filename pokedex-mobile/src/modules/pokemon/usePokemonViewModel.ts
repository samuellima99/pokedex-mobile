import { useEffect, useState } from "react";
import { fetchPokemon, type Pokemon } from "../../api";

export function usePokemonViewModel(id: number) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      console.log("Carregando Pokémon", id);
      try {
        setLoading(true);
        setError(null);
        setPokemon(null);
        const data = await fetchPokemon(id);
        setPokemon(data);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  return { pokemon, loading, error };
}
