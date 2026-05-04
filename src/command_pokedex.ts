import { stat } from "node:fs";
import { Pokemon } from "./pokeapi.js";
import type { State } from "./state.js"

export async function commandPokedex(state: State) : Promise<void> {
    

    if (Object.keys(state.usersPokedex).length === 0) {
        console.log("Pokedex empty.")
        return
    }
    
    console.log(`Your Pokedex:`)
    for (const pokemon in state.usersPokedex) {
        console.log(`- ${pokemon}`)
    }
}

