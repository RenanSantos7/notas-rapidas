import { parseISO, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

/**
 * Recebe uma string em formato ISO e retorna uma string no formato 'HH:mm',
 * @example
 * formatTime('2022-11-22T14:30:00.000Z') => '14:30'
 * @param date - A data em formato ISO.
 * @returns A string formatada.
 */
export default function formatTime(date: string) {
	const parsedDate = parseISO(date);
	return format(parsedDate, 'HH:mm', { locale: ptBR });
}
