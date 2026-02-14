import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import isEmptyObj from '../utils/isEmptyObj';

/**
 * Checks if a value retrieved from AsyncStorage should be considered "void" (empty/unintentional).
 *
 * This function is specifically designed for AsyncStorage context, where we need to distinguish
 * between intentionally stored falsy values (like 0 or false) and truly empty/unintentional values.
 *
 * Values considered void:
 * - `undefined` (not set)
 * - Empty arrays `[]`
 * - Empty objects `{}` (or objects with only null/undefined/empty string properties)
 * - Empty strings `''`
 * - `null`
 *
 * Values considered valid (not void):
 * - `0` (intentionally stored number)
 * - `false` (intentionally stored boolean)
 * - Any non-empty arrays, objects with valid properties, or non-empty strings
 *
 * @param value - The value to check, typically retrieved from AsyncStorage
 * @returns `true` if the value should be considered void/empty, `false` if it's a valid stored value
 *
 * @example
 * ```typescript
 * isVoidValue(undefined); // true
 * isVoidValue(null); // true
 * isVoidValue(''); // true
 * isVoidValue([]); // true
 * isVoidValue({}); // true
 * isVoidValue(0); // false (valid number)
 * isVoidValue(false); // false (valid boolean)
 * isVoidValue([1, 2]); // false (valid array)
 * isVoidValue({name: 'John'}); // false (valid object)
 * ```
 */
function isVoidValue(value: any) {
	if (value === undefined) return true;
	if (Array.isArray(value) && !value.length) return true;
	if (typeof value === 'object') return isEmptyObj(value);
	if (value === '') return true;
	return false;
}

async function storeData(key: string, value: any) {
	try {
		if (!isVoidValue(value)) {
			await AsyncStorage.setItem(key, JSON.stringify(value));
		}
	} catch (e) {
		console.error('Erro ao salvar no AsyncStorage:', e);
	}
}

async function getData(key: string) {
	try {
		const jsonValue = await AsyncStorage.getItem(key);
		return jsonValue != null ? JSON.parse(jsonValue) : null;
	} catch (e) {
		console.error('Erro ao carregar dados do AsyncStorage:', e);
	}
}

/**
 * Custom hook to manage persistent state using AsyncStorage.
 * It retrieves the stored value on mount and updates the storage whenever the state changes.
 * Works similarly to `useState`, but with persistence.
 * @param key A key to identify the stored value in AsyncStorage.
 * @param initialValue _Optional_. An initial value to set if no stored value is found.
 * If not provided, the initial state will be `null`.
 * @returns A tuple containing a getter and a setter to the current state.
 * @example
 * const [value, setValue] = usePersistentState('myKey', 'defaultValue');
 * // value will be 'defaultValue' if no stored value is found for 'myKey'
 *
 */
export default function usePersistentState<T>(
	key: string,
	initialValue?: T,
): [T, Dispatch<SetStateAction<T>>] {
	const [state, setState] = useState<T | any>(
		initialValue ? initialValue : null,
	);
	const isInitialMount = useRef(true);

	useEffect(() => {
		getData(key).then(storedValue => {
			if (storedValue !== null) {
				setState(storedValue);
			}
		});
	}, [key]);

	useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false;
		} else {
			storeData(key, state);
		}
	}, [key, state]);

	return [state, setState];
}
