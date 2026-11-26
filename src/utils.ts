import type { Stat } from "./api";

// Highest base stat a Pokémon can have. Used as 100% in the stat bars.
export const MAX_STAT = 255;

export function formatNumber(id: number): string {
  return "Nº " + String(id).padStart(3, "0");
}

// "mr-mime" -> "Mr Mime"
export function formatName(name: string): string {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatHeight(height: number): string {
  return (height / 10).toFixed(1).replace(".", ",") + " m";
}

export function formatWeight(weight: number): string {
  return (weight / 10).toFixed(1).replace(".", ",") + " kg";
}

export function sumStats(stats: Stat[]): number {
  let total = 0;
  for (const stat of stats) {
    total += stat.value;
  }
  return total;
}

type Info = {
  label: string;
  color: string;
};

const TYPES: Record<string, Info> = {
  normal: { label: "Normal", color: "#D1D1C7" },
  fire: { label: "Fogo", color: "#FFA15E" },
  water: { label: "Água", color: "#93AFFF" },
  grass: { label: "Planta", color: "#A8E58C" },
  electric: { label: "Elétrico", color: "#FFE170" },
  ice: { label: "Gelo", color: "#A6E6E4" },
  fighting: { label: "Lutador", color: "#EE7B74" },
  poison: { label: "Venenoso", color: "#D69AE0" },
  ground: { label: "Terrestre", color: "#FFCE85" },
  flying: { label: "Voador", color: "#C3B6FF" },
  psychic: { label: "Psíquico", color: "#FF9FBA" },
  bug: { label: "Inseto", color: "#C9DC6E" },
  rock: { label: "Pedra", color: "#DCCB8A" },
  ghost: { label: "Fantasma", color: "#B4A3DB" },
  dragon: { label: "Dragão", color: "#A58BFF" },
  steel: { label: "Aço", color: "#C4C4DA" },
  fairy: { label: "Fada", color: "#FFB8DF" },
};

// There is no Dark ("Sombrio") type in the first 151 Pokémon.
export const TYPE_NAMES = Object.keys(TYPES);

export function typeInfo(type: string): Info {
  return TYPES[type] ?? { label: type, color: "#E2E4EA" };
}

const STATS: Record<string, Info> = {
  hp: { label: "HP", color: "#F0566A" },
  attack: { label: "Ataque", color: "#FF994D" },
  defense: { label: "Defesa", color: "#F2C94C" },
  "special-attack": { label: "Atq. Especial", color: "#5BC8F5" },
  "special-defense": { label: "Def. Especial", color: "#7BD389" },
  speed: { label: "Velocidade", color: "#FB8FB0" },
};

export function statInfo(name: string): Info {
  return STATS[name] ?? { label: name, color: "#C4C8D4" };
}
