import { Cache } from "./pokecache.js"

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2"
    #cache: Cache = new Cache(10000)

    async fetchLocationAreas(pageURL?: string) : Promise<ShallowLocationAreas> {
        const locationAreasURL = pageURL ?  pageURL : `${PokeAPI.baseURL}/location-area`

        // Checks to see if the locations areas URL is already stored in the cache.
        // If so it will get the location areas from the local cache rather than make a network request.
        let cacheHit: ShallowLocationAreas | undefined = this.#cache.get(locationAreasURL)

        if (cacheHit) {
            return cacheHit;
        }

        const reqInit: RequestInit = {
            method: "GET",
            mode: "cors"
        }
        const response = await fetch(locationAreasURL, reqInit)

        let locationAreas: ShallowLocationAreas = await response.json();
        this.#cache.add(locationAreasURL, locationAreas)

        return locationAreas
    }


    async fetchLocationArea(location : string ) : Promise<LocationArea> {
        const locationAreaURL = `${PokeAPI.baseURL}/location-area/${location}`

        let cacheHit: LocationArea | undefined = this.#cache.get(locationAreaURL)

        if (cacheHit) {
            return cacheHit;
        }

        const reqInit: RequestInit = {
            method: "GET",
            mode: "cors"
        }

        const response = await fetch(locationAreaURL, reqInit)
        let locationArea: LocationArea = await response.json();   
        this.#cache.add(locationAreaURL, locationArea)

        return locationArea;
    }

    async fetchPokemon(pokemonName: string) : Promise<Pokemon>{
        const pokemonURL = `${PokeAPI.baseURL}/pokemon/${pokemonName}`
        
        let cacheHit: Pokemon | undefined = this.#cache.get(pokemonURL)

        if (cacheHit) {
            return cacheHit;
        }

        const reqInit: RequestInit = {
            method: "GET",
            mode: "cors"
        }

        const response = await fetch(pokemonURL, reqInit)
        let pokemon: Pokemon = await response.json();   
        this.#cache.add(pokemonURL, pokemon)

        return pokemon;
    }
}

export type ShallowLocationAreas = {
    next: string
    previous: string 
    name: string,
    results: LocationArea[]
}
    
export type LocationArea = {
    id: number,
    name: string,
    pokemon_encounters: PokemonEncounter[]
}

export type PokemonEncounter = {
    pokemon: {name: string, url: string},
}

export type Pokemon = {
    id: number,
    name: string,
    base_experience: number
    height: number,
    weight: number,
    stats: Stat [],
    types: Type []
}

export type Stat = {
    stat: {name: string, url: string},
    base_stat: number
}


export type Type = {
    type: {name: string, url: string}
}