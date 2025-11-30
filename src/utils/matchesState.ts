import type { State } from "../types/State";

export function matchesState(state: State, input: string) {
  return state.name.toLowerCase() === input.trim().toLowerCase();
}
