/**
 * Compares two arrays for equality with optional strict mode comparison.
 *
 * @template T - The type of elements in the arrays
 * @param a - The first array to compare
 * @param b - The second array to compare
 * @param strictMode - If enabled, performs a strict comparison that takes into account the order of elements.
 *                     If disabled (default), compares the arrays ignoring the order of elements. Default is `false`
 * @returns `true` if arrays are equal under the specified comparison mode, `false` otherwise
 *
 * @example
 * ```typescript
 * // Strict mode - order matters
 * isEqualArrays([1, 2, 3], [1, 2, 3], true); // true
 * isEqualArrays([1, 2, 3], [3, 2, 1], true); // false
 *
 * // Non-strict mode - order doesn't matter
 * isEqualArrays([1, 2, 3], [3, 2, 1], false); // true
 * isEqualArrays([1, 2, 3], [1, 2, 4], false); // false
 * ```
 */
export default function isEqualArrays<T>(
	a: T[],
	b: T[],
	strictMode: boolean = false,
) {
	if (strictMode) {
		return a.length === b.length && a.every((v, i) => v === b[i]);
	}

	const aSorted = a.toSorted();
	const bSorted = b.toSorted();
	return a.length === b.length && aSorted.every((v, i) => v === bSorted[i]);
}
