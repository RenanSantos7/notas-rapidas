/**
 * Checks if an object is empty.
 * The object is considered empty if it is `null`, `undefined`, has no properties,
 * or all its properties are `null`, `undefined`, or an empty string (`''`).
 *
 * @param obj - The object to check.
 * @returns Returns `true` if the object is empty
 * (i.e., all its properties are `null`, `undefined`, or `''`),
 * otherwise returns `false`.
 *
 * @example
 * ```typescript;
 * console.log(isEmptyObj({ a: null, b: undefined, c: '' })); // true
 * console.log(isEmptyObj({ a: 1, b: null, c: '' })); // false
 * console.log(isEmptyObj({})); // true
 * console.log(isEmptyObj(null)); // true
 * console.log(isEmptyObj(undefined)); // true
 * ```
 */
export default function isEmptyObj(obj: object): boolean {
	if (obj === null || obj === undefined) {
		return true;
	}
	
	const values = Object.values(obj);
	if (!values.length) {
		return true;
	}
	
	return values.every(value => 
        value === null || value === undefined || value === ''
    );
}
