import { State } from "./state.js" 

export async function commandHelp(state: State) : Promise<void>{
    console.log("Welcome to the Pokedex!\nUsage:\n")

    for (const key in state.commandRegistery) {
        console.log(`${state.commandRegistery[key].name}: ${state.commandRegistery[key].description}`)
    }
    return;
}   