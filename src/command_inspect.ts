import { stat } from "node:fs";
import { Pokemon } from "./pokeapi.js";
import type { State } from "./state.js"

const INSPECT_CMD_HELP = "Use: catch <pokemon_name> | <pokemon_id>";

export async function commandInspect(state: State, pokemonName: string | undefined) : Promise<void> {

    if (!pokemonName || pokemonName.length === 0) {
        console.log(INSPECT_CMD_HELP)        
        return 
    }

    let pokemon: Pokemon | undefined = state.usersPokedex[pokemonName]
    if (!pokemon) {
        console.log("you have not caught that pokemon")
        return
    }

    console.log(`Name: ${pokemon.name}`)
    console.log(`Height: ${pokemon.height}`)
    console.log(`Weight: ${pokemon.weight}`)
    console.log("Stats:")
    for ( let stat of pokemon.stats) {
        console.log(`-${stat.stat.name}: ${stat.base_stat}`)
    }

    console.log("Types:")
    for ( let type of pokemon.types) {
        console.log(`- ${type.type.name}`)
    }
}

