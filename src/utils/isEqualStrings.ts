/**
 * Checks if two or more strings are equal, ignoring case sensitivity and leading/trailing whitespace.
 * 
 * @example
 * ```
 * const a = 'Olá mundo '
 * const b = 'olá mundo'
 * 
 * isEqualStrings(a, b) // returns true
 * isEqualStrings(a, 'Olá mundo!') // returns false
 * isEqualStrings() // returns false
 * ```
 */
export default function isEqualStrings(...strings: string[]) {
	if (strings.length === 0) return false;
	const normalized = strings.map(s => s.trim().toLowerCase());
	return normalized.every(s => s === normalized[0]);
}
