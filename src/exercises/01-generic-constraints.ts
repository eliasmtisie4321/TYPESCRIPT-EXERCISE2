/* ============================================================
 * EXERCISE 1 — Generic Constraints & keyof Mapping
 * ============================================================
 * Domain: a typed e-commerce store. No `any`, no `as any`,
 * no `@ts-ignore`. Run `npm run typecheck` until zero errors.
 * ============================================================ */

export interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

/* ---- 1a. Typed getter ----
 * `getField` returns the value at `key` with the CORRECT type
 * (getField(p, "price") is number, getField(p, "name") is string).
 * Asking for a key that doesn't exist must be a COMPILE error. */

export function getField<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

/* ---- 1b. Typed setter that returns a NEW object ----
 * `withField` returns a copy of `obj` with `key` set to `value`.
 * `value` must match the type of that field — passing a string for
 * `price` must be a compile error. Do not mutate `obj`. */

export function withField<T, K extends keyof T>(
  obj: T,
  key: K,
  value: T[K]
): T {
  return { ...obj, [key]: value };
}

/* ---- 1c. Constrained-to-number-fields sum ----
 * Only keys whose values are numbers are allowed. */

export function sumBy<
  T,
  K extends keyof T
>(
  items: T[],
  key: K & (T[K] extends number ? K : never)
): number {
  return items.reduce((total, item) => {
    return total + (item[key] as number);
  }, 0);
}

export const products: Product[] = [
  { id: 1, name: "Mug", price: 80, inStock: true },
  { id: 2, name: "Notebook", price: 45, inStock: false },
];

// @ts-expect-error "colour" is not a key of Product
getField(products[0], "colour");

// @ts-expect-error price is a number, not a string
withField(products[0], "price", "expensive");

// @ts-expect-error "name" is not a number-valued field
sumBy(products, "name");
