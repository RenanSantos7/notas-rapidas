/**
 * Recebe uma string em formato ISO e retorna uma string no formato 'dd/MMM/yy',
 * @example 
 * formatDate('2022-11-22') => '22/nov/22'
 * @param date - A data em formato ISO.
 * @returns A string formatada.
 */
export default function formatDate(date: string) {
	const dateObj = new Date(date);
	return dateObj.toLocaleDateString('pt-BR');
}
