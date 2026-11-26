import type { ImageSourcePropType } from "react-native";
import { MOCK_ARTWORK, MOCK_POKEMON, MOCK_SPRITES } from "./mock";
import { TYPE_NAMES } from "./utils";

// true  = uses the data saved in mock.ts (works without internet)
// false = uses the real PokéAPI
export const USE_MOCK = false;

const BASE_URL = "https://pokeapi.co/api/v2";
const IMAGES_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

export const TOTAL_POKEMON = 151;

export type Stat = {
  name: string; // "hp", "attack", "defense", "special-attack", "special-defense", "speed"
  value: number;
};

export type PokemonSummary = {
  id: number;
  name: string;
  sprite: ImageSourcePropType; // small animated image, used in the cards
  types: string[]; // ex.: ["fire", "flying"]
};

export type Pokemon = {
  id: number;
  name: string;
  image: ImageSourcePropType; // big image (official artwork)
  types: string[];
  height: number; // in decimeters (7 = 0,7 m)
  weight: number; // in hectograms (69 = 6,9 kg)
  baseExperience: number;
  abilities: string[];
  stats: Stat[];
};

// Full example: https://pokeapi.co/api/v2/pokemon/1
export type ApiPokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: { slot: number; type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
};

// Example: https://pokeapi.co/api/v2/pokemon?limit=151
type ApiPokemonList = {
  results: { name: string; url: string }[];
};

// Example: https://pokeapi.co/api/v2/type/fire
type ApiType = {
  name: string;
  pokemon: { slot: number; pokemon: { name: string; url: string } }[];
};

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function errorMessage(status: number): string {
  if (status === 404) return "Pokémon não encontrado.";
  return `Erro ao acessar a PokéAPI (código ${status}).`;
}

function spriteOf(id: number): ImageSourcePropType {
  if (USE_MOCK) return MOCK_SPRITES[id];
  return {
    uri: `${IMAGES_URL}/versions/generation-v/black-white/animated/${id}.gif`,
  };
}

function artworkOf(id: number): ImageSourcePropType {
  if (USE_MOCK) return MOCK_ARTWORK[id];
  return { uri: `${IMAGES_URL}/other/official-artwork/${id}.png` };
}

// "https://pokeapi.co/api/v2/pokemon/25/" -> 25
function idFromUrl(url: string): number {
  const parts = url.split("/");
  return Number(parts[parts.length - 2]);
}

// The list has no types, so they come from /type/fire, /type/water...
async function fetchTypesById(): Promise<Record<number, string[]>> {
  const responses = await Promise.all(
    TYPE_NAMES.map((type) => fetch(`${BASE_URL}/type/${type}`)),
  );

  const typesById: Record<number, string[]> = {};
  for (const response of responses) {
    if (!response.ok) throw new Error(errorMessage(response.status));
    const data: ApiType = await response.json();
    for (const item of data.pokemon) {
      const id = idFromUrl(item.pokemon.url);
      if (!typesById[id]) typesById[id] = [];
      typesById[id][item.slot - 1] = data.name; // slot 1 = first type
    }
  }
  return typesById;
}

export async function fetchPokemonList(): Promise<PokemonSummary[]> {
  if (USE_MOCK) {
    await wait(400);
    return MOCK_POKEMON.map((item) => ({
      id: item.id,
      name: item.name,
      sprite: spriteOf(item.id),
      types: item.types.map((type) => type.type.name),
    }));
  }

  const response = await fetch(`${BASE_URL}/pokemon?limit=${TOTAL_POKEMON}`);
  if (!response.ok) throw new Error(errorMessage(response.status));
  const data: ApiPokemonList = await response.json();
  const typesById = await fetchTypesById();

  return data.results.map((item) => {
    const id = idFromUrl(item.url);
    return {
      id,
      name: item.name,
      sprite: spriteOf(id),
      types: typesById[id] ?? [],
    };
  });
}

function toPokemon(data: ApiPokemon): Pokemon {
  return {
    id: data.id,
    name: data.name,
    image: artworkOf(data.id),
    types: data.types.map((item) => item.type.name),
    height: data.height,
    weight: data.weight,
    baseExperience: data.base_experience,
    abilities: data.abilities.map((item) => item.ability.name),
    stats: data.stats.map((item) => ({
      name: item.stat.name,
      value: item.base_stat,
    })),
  };
}

const downloaded: Record<number, ApiPokemon> = {};

async function fetchApiPokemon(id: number): Promise<ApiPokemon> {
  if (USE_MOCK) {
    await wait(300);
    return MOCK_POKEMON[id - 1];
  }

  if (!downloaded[id]) {
    const response = await fetch(`${BASE_URL}/pokemon/${id}`);
    if (!response.ok) throw new Error(errorMessage(response.status));
    downloaded[id] = await response.json();
  }
  return downloaded[id];
}

export async function fetchPokemon(id: number): Promise<Pokemon> {
  const data = await fetchApiPokemon(id);
  return toPokemon(data);
}
