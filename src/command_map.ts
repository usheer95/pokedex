import { stat } from "node:fs"
import { ShallowLocationAreas } from "./pokeapi.js"
import { State } from "./state.js"

export async function commandMap(state: State) : Promise<void> {
    const pageURL = state.nextLocationPageURL ? state.nextLocationPageURL : undefined    
    const locations: ShallowLocationAreas = await state.pokeApi.fetchLocationAreas(pageURL)
    state.nextLocationPageURL = locations.next
    state.pevLocationPageURL = locations.previous
    console.log("NEXT: " + state.nextLocationPageURL)
    console.log("PREV: " + state.pevLocationPageURL)
    locations.results.forEach((loc) => console.log(loc.name))
    return;
}   