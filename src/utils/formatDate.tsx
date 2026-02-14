import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

/**
 * Recebe uma string em formato ISO e retorna uma string no formato 'dd/MMM/yy',
 * @example 
 * formatDate('2022-11-22') => '22/nov/22'
 * @param date - A data em formato ISO.
 * @returns A string formatada.
 */
export default function formatDate(date: string) {
	const parsedDate = parseISO(date);
	const dateObj = new Date(parsedDate);
	const day = dateObj.getDate();
	if (day === 1) return format(parsedDate, 'do/MMM/yy', { locale: ptBR });
	return format(parsedDate, 'dd/MMM/yy', { locale: ptBR });
}
