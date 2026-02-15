/**
 * Corta uma string num tamanho determinado. Se o número de caracteres definido for
 * inválido ou maior do que o tamanho da string, ela será retornada sem alteração.
 * 
 * Caso contrário, a string é cortada e adicionadas reticências.
 * 
 * @param str a string a ser operada
 * @param chars o número de caracteres máximo
 */
export default function limitString(str: string | string[], chars: number): string {
    if (!str) return ''

    function getLimitedString(value: string) {
        if (!chars || chars >= value.length) {
            return value
        }
               
        return value.substring(0, chars) + '...';
    }

    if (typeof str == 'string') {
        return getLimitedString(str)
    }

    if (Array.isArray(str)) {
        return getLimitedString(str.join(', '))
    }

    console.error('limitString awaits a string or a string array')
    return ''
}
