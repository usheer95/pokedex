import { startCli } from "./repl.js";
import { State, initState } from "./state.js";

function main() {
    const state: State = initState()
    startCli(state);
}   

main();