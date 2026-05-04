import { createInterface, Interface } from "node:readline"
import {stdin as input, stdout as output } from 'node:process'
import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';
import { PokeAPI, Pokemon } from "./pokeapi.js";
import { commandMap } from "./command_map.js";
import { commandMapB } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";


export type CommandRegistry = Record<string, CLICommand>
export type Pokedex =  Record<string, Pokemon>
export type CommandCallback = (state: State, ...args: string[]) => Promise<void>

export type CLICommand = {
    name: string,
    description: string,
    callback: CommandCallback
}

export type State = {
    readLine: Interface
    commandRegistery: CommandRegistry
    pokeApi: PokeAPI
    pevLocationPageURL: string | undefined
    nextLocationPageURL: string | undefined
    usersPokedex: Pokedex
}

export function initState() : State {
    return {
        readLine: createInterface(input, output),
        commandRegistery: getCommands(),
        pokeApi: new PokeAPI(),
        pevLocationPageURL: undefined,
        nextLocationPageURL: undefined,
        usersPokedex: {}
    } 
}

export function getCommands() : CommandRegistry {
    return { 
        exit: { 
            name: "exit", 
            description: "Exits the pokedex", 
            callback: commandExit
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp
        },
        map: {
            name: "map",
            description: "Displays a list of the next 20 locations",
            callback: commandMap
        }, 
        mapb: {
            name: "mapb",
            description: "Displays a list of the previous 20 locations",
            callback: commandMapB
        },
        explore: {
            name: "explore",
            description: "Explore a specific location area",
            callback: commandExplore
        },
        catch: {
            name: "catch",
            description: "Catch a specific Pokemon",
            callback: commandCatch
        },
        inspect: {
            name: "inspect",
            description: "Inspect a specific Pokemon in your pokedex",
            callback: commandInspect
        },
        pokedex: {
            name: "pokedex",
            description: "View all caught Pokemon",
            callback: commandPokedex
        }
    }
}