import { LocationArea, ShallowLocationAreas } from "./pokeapi.js";
import { State } from "./state.js";

const EXPLORE_CMD_HELP = "Use: explore <area_name> | <area_id>";

export async function commandExplore(state: State, location: string | undefined)  : Promise<void> {

    // Need to require a location input here!
    if (!location || location.length === 0) {
        console.log(EXPLORE_CMD_HELP)        
        return 
    }
    
    console.log(`Exploring ${location}...`)
    
    try {
        const locationArea : LocationArea = await state.pokeApi.fetchLocationArea(location);

        if (!locationArea.pokemon_encounters || locationArea.pokemon_encounters.length === 0) {
            console.log("No Pokemon Found.")
            return;
        }

        console.log("Found Pokemon:")
        locationArea.pokemon_encounters.forEach((encounter) => console.log(`- ${encounter.pokemon?.name}`))

    } catch (error) {
        console.log(EXPLORE_CMD_HELP)
    }
} 