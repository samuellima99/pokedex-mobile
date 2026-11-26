import { useEffect, useState } from "react";
import { fetchPokemon, type Pokemon } from "../../api";

export function usePokemonViewModel(id: number) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setError(null);
      setPokemon(null);
      console.log("Carregando Pokémon", id);
      try {
        const data = await fetchPokemon(id);
        if (active) setPokemon(data);
      } catch (e) {
        if (active) setError((e as Error).message);
      } finally {
        if (active) setLoading(false);
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [id]);

  return { pokemon, loading, error };
}
