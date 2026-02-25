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
 * isEqualArrays([1, 2, 3], [3, 2, 1]); // true
 * isEqualArrays([1, 2, 3], [1, 2, 4]); // false
 * ```
 */
export default function isEqualArrays<T>(
	a: T[],
	b: T[],
	strictMode: boolean = false,
) {
	if (!Array.isArray(a) || !Array.isArray(b)) {
		return false;
	}

	if (a.length !== b.length) {
		return false;
	}

	if (strictMode) {
		return a.every((v, i) => v === b[i]);
	}

	const aSorted = [...a].sort();
	const bSorted = [...b].sort();
	return aSorted.every((v, i) => v === bSorted[i]);
}
