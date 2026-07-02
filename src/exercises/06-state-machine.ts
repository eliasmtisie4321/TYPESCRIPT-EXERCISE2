/* ============================================================
 * EXERCISE 6 — Discriminated-Union Reducer (state machine)
 * ============================================================
 * A typed reducer with exhaustive action handling. No `any`.
 * Run `npm run typecheck`.
 * ============================================================ */

/* The state of a data fetch. Model as a discriminated union on `status`. */
export type FetchState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string };

/* ---- 6a. Actions ---- */
export type Action<T> =
  | { type: "FETCH" }
  | { type: "RESOLVE"; data: T }
  | { type: "REJECT"; error: string }
  | { type: "RESET" };

/* Helper for exhaustive checking */
function assertNever(x: never): never {
  throw new Error("Unhandled action type: " + JSON.stringify(x));
}

/* ---- 6b. Reducer ---- */
export function reducer<T>(
  _state: FetchState<T>,
  action: Action<T>
): FetchState<T> {
  switch (action.type) {
    case "FETCH":
      return { status: "loading" };

    case "RESOLVE":
      return { status: "success", data: action.data };

    case "REJECT":
      return { status: "error", message: action.error };

    case "RESET":
      return { status: "idle" };

    default:
      return assertNever(action);
  }
}