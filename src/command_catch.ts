import { stat } from "node:fs";
import { Pokemon } from "./pokeapi.js";
import type { State } from "./state.js"


const CATCH_CMD_HELP = "Use: catch <pokemon_name> | <pokemon_id>";
const MAX_BASE_EXP = 255;

export async function commandCatch(state: State, pokemonName: string | undefined) : Promise<void> {

    if (!pokemonName || pokemonName.length === 0) {
        console.log(CATCH_CMD_HELP)        
        return 
    }
    
    console.log(`Throwing a Pokeball at ${pokemonName}...`)
        
    try {
        let foundPokemon: Pokemon = await state.pokeApi.fetchPokemon(pokemonName)

        let norm_exp = foundPokemon.base_experience / MAX_BASE_EXP
        const chanceToCatch = Number((1.0 - norm_exp).toFixed(2))
        const randomRoll = Number(Math.random().toFixed(2))

        if (randomRoll >= chanceToCatch) {
            state.usersPokedex[foundPokemon.name] = foundPokemon;
            console.log(`${pokemonName} was caught!`)

        } else {
            console.log(`${pokemonName} escaped!`)
        }
        
    } catch(error) {
        console.log(CATCH_CMD_HELP)   
    }
}

