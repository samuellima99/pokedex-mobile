# Prova - Programação para Dispositivos Móveis - PDM

**App: Pokédex** - mostra os 151 Pokémon da primeira geração, com busca pelo nome, filtro por tipo e uma tela de detalhes para cada um. Os dados vêm da [PokéAPI](https://pokeapi.co) (gratuita, sem chave).

**Duração:** 1 hora · **5 questões** · cada questão vale **2,0 pontos**

## Como rodar

```bash
npm install
npx expo start
```

Abra no celular pelo Expo Go (QR code) ou no emulador. Os `console.log` aparecem no terminal onde o `npx expo start` está rodando.

### Se o emulador não funcionar (Expo Web)

```bash
npx expo start --web
```

O app abre no navegador, com a largura de um celular. Na web, os `console.log` aparecem no **console do navegador** (F12 → aba Console), e não no terminal.

### Sem internet

Se a internet ou a PokéAPI não estiverem funcionando, troque `USE_MOCK` para `true` em `src/api.ts`. O app passa a usar os dados salvos em `src/mock.ts` e as imagens da pasta `assets/pokemon`, e funciona sem internet.

## Estrutura

O app segue MVVM: cada tela tem uma View (`*Screen.tsx`) e um ViewModel (`use*ViewModel.ts`) com o estado e a lógica.

```
App.tsx                                     -> carrega a fonte e alterna entre a lista e os detalhes
src/api.ts                                  -> Model: tipos e busca dos dados (PokéAPI ou mock)
src/mock.ts                                 -> dados salvos dos 151 Pokémon (não altere)
src/utils.ts                                -> formatação, total dos status e tabelas de tipos e status
src/theme.ts                                -> cores, fontes, raios e sombras
src/modules/pokedex/PokedexScreen.tsx       -> View da lista (busca, filtro por tipo e cards)
src/modules/pokedex/usePokedexViewModel.ts  -> ViewModel da lista
src/modules/pokemon/PokemonScreen.tsx       -> View dos detalhes
src/modules/pokemon/usePokemonViewModel.ts  -> ViewModel dos detalhes
src/components/PokemonCard.tsx              -> card de um Pokémon na lista
src/components/TypeBadge.tsx                -> etiqueta colorida de um tipo
src/components/StatBar.tsx                  -> barra de um status base
src/components/Pokeball.tsx                 -> desenho da Poké Bola
src/components/Loading.tsx                  -> Poké Bola girando enquanto carrega
assets/pokemon/                             -> imagens salvas (usadas pelo mock)
assets/fonts/                               -> fonte Poppins
```

## Regras

- Não altere `src/mock.ts`.
- Não instale bibliotecas.
- Não renomeie arquivos, funções ou componentes.
- As questões são independentes: dá para fazer em qualquer ordem.
- No final, o app deve abrir sem erros e sem avisos vermelhos/amarelos.

---

## Parte 1 - Corrigir erros

Encontre a causa de cada problema e corrija.

### Questão 01 - Busca e filtro por tipo não funcionam

**a) Busca:** ao digitar em "Buscar Pokémon pelo nome", nada aparece no campo e a lista não muda.

Faça o texto aparecer e filtrar a lista. Esperado: ao digitar `char`, sobram **Charmander**, **Charmeleon** e **Charizard**, e o contador mostra **3 Pokémon**.

**b) Filtro por tipo:** ao tocar em um tipo, como **Fogo**, o botão fica colorido, mas nenhum card aparece. Em **Dragão**, aparecem só Dragonair e Dragonite. O filtro deve mostrar os Pokémon que **têm** o tipo escolhido.

Esperado: Fogo → **12 Pokémon** (Charmander, Charmeleon, Charizard, Vulpix...); Dragão → **Dratini**, **Dragonair** e **Dragonite**; Todos → **151 Pokémon** de novo.

Dica: cada Pokémon tem a lista `types` (ex.: `["fire", "flying"]`), e `selectedType` guarda o tipo escolhido (ex.: `"fire"`).

### Questão 02 - Detalhes carregam sem parar

Ao tocar no Charizard, o terminal (ou o console do navegador, no Expo Web) mostra `Carregando Pokémon 6` centenas de vezes, sem parar.

Carregue o Pokémon **uma vez** ao abrir a tela, e de novo só se o `id` mudar. Esperado: `Carregando Pokémon 6` aparece **uma vez**.

### Questão 03 - Total dos status errado

Na tela do Charizard aparece **Total 100**, mas os status dele são 78, 84, 78, 109, 85 e 100, que somam **534**. O total está saindo igual ao último status. Corrija a função `sumStats`.

Esperado: Bulbasaur (Nº 001) → **318**; Charizard (Nº 006) → **534**; Mew (Nº 151) → **600**.

---

## Parte 2 - Criar componentes

Procure os comentários `// TODO Questão NN` no código. Hoje os componentes retornam `null`. Os estilos já estão prontos no `StyleSheet` de cada componente.

### Questão 04 - Tipos do Pokémon (`TypeBadge.tsx`, `PokemonCard.tsx` e `PokemonScreen.tsx`)

Os cards da lista e a tela de detalhes não mostram os tipos do Pokémon.

1. **`src/components/TypeBadge.tsx`:** o componente recebe `type` (ex.: `"fire"`). Mostre uma `View` com o estilo `styles.badge` e a cor de fundo `typeInfo(type).color`. Dentro dela, um `Text` com o estilo `styles.label` e o nome do tipo em português, `typeInfo(type).label`.
2. **`src/components/PokemonCard.tsx`** e **`src/modules/pokemon/PokemonScreen.tsx`:** no `TODO Questão 04`, mostre um `TypeBadge` para cada tipo da lista `pokemon.types`.

Esperado: no card e na tela do Charizard → **FOGO** (laranja) e **VOADOR** (lilás); Bulbasaur → **PLANTA** (verde) e **VENENOSO** (roxo). Sem o aviso _"Each child in a list should have a unique "key" prop"_.

Dica: dá para juntar dois estilos em um array: `style={[styles.badge, { backgroundColor: "red" }]}`.

### Questão 05 - Barras dos status (`src/components/StatBar.tsx`)

A seção "Status base" mostra só o total. O `StatBar` já é usado uma vez para cada status e recebe um `stat` (ex.: `{ name: "hp", value: 78 }`). Mostre, em uma `View` com o estilo `styles.row`:

- o nome do status em português, `statInfo(stat.name).label` (estilo `styles.label`);
- o valor, `stat.value` (estilo `styles.value`);
- a barra: um trilho cinza (`View` com `styles.track`) com um preenchimento dentro (`View` com `styles.fill`), na cor `statInfo(stat.name).color`. A largura do preenchimento é `stat.value / MAX_STAT`, em %.

Esperado: no Charizard, a barra de **Atq. Especial (109)** ocupa cerca de 43% do trilho; no Chansey (Nº 113), a barra de **HP (250)** fica quase cheia.

Dica: a largura aceita porcentagem em texto, como `width: "43%"`.
