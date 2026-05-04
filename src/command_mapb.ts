import { ShallowLocationAreas } from "./pokeapi.js";
import { State } from "./state.js";

export async function commandMapB (state: State) : Promise<void> {

    if (!state.pevLocationPageURL) {
        console.log("you're on the first page")
        return 
    }
    const pageURL = state.pevLocationPageURL
    const locations: ShallowLocationAreas = await state.pokeApi.fetchLocationAreas(pageURL)
    
    state.pevLocationPageURL = locations.previous
    state.nextLocationPageURL = locations.next
    locations.results.forEach((loc) => console.log(loc.name))
    return
} 