
import { stat } from "node:fs";
import { CLICommand, CommandCallback, State } from "./state.js"

export function cleanInput(input: string) : string[] {

    let cleaned: string [] = input.trim().split(/\s+/)
    return cleaned; 
}

export function startCli(state: State) : void {
    state.readLine.setPrompt("Pokedex > ")
    state.readLine.prompt()

    /// Adds an event listener
    state.readLine.on("line", async (input: string) => {
        if(input.length === 0) {
            state.readLine.prompt()
            return;
        }

        const inputs: string[] = cleanInput(input);

        const command = inputs.at(0)
        if (!command) {
            state.readLine.prompt()
            return 
        }
        
        // Will always return a string array, will just be empty if no values from the index
        const args = inputs.slice(1)

        let commandHandled: Boolean = false
            
        if (command in state.commandRegistery) {
            const comandHandler: CommandCallback = state.commandRegistery[command].callback

            try { 
                // TODO - Need to await for this callback to complete before we 
                // continue
                await comandHandler(state, ...args)

            } catch(error) {
                console.log(error)
            } finally {
                commandHandled = true
            }
        }

        if (!commandHandled) console.log("Unkown command")

        state.readLine.prompt()
    });
}





