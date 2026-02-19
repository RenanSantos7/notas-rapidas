/**
 * Converts a string of HTML content into a Markdown formatted string.
 * - This function processes block-level elements (headings, paragraphs, lists, tables),
 * inline formatting (bold, italic, code), and custom elements like task lists (checkboxes).
 * It also normalizes whitespace and removes redundant structural tags such as `thead` and `tbody`.
 *
 * @param {string} text - The raw HTML string to be converted.
 * @returns {string} The converted Markdown string, trimmed and normalized.
 * @example
 * ```ts
 * const html = '<h1>Title</h1><p>Hello <b>World</b></p>';
 * const md = convertHtmlToMd(html);
 * // Returns: "# Title\n\nHello **World**"
 * ```
 */
export default function convertHtmlToMd(text: string): string {
	text = processTables(text);
	text = processLists(text);
	text = processCheckboxes(text);

	const replacements: [RegExp, string][] = [
		[/<h1>(.*?)<\/h1>/g, '\n# $1\n'],
		[/<h2>(.*?)<\/h2>/g, '\n## $1\n'],
		[/<h3>(.*?)<\/h3>/g, '\n### $1\n'],
		[/<p>(.*?)<\/p>/g, '\n$1\n'],
		[/<hr(?:\s*\/)?>/g, '\n***\n'],
		[/<label><input type="checkbox">(.*?)<\/label>/g, '- [ ] $1\n'],
		// [/<label><input type="checkbox" checked>(.*?)<\/label>/g, '- [x] $1\n'],
		[/<b>(.*?)<\/b>|<strong>(.*?)<\/strong>/g, '**$1$2**'],
		[/<i>(.*?)<\/i>|<em>(.*?)<\/em>/g, '*$1$2*'],
		[/<code>(.*?)<\/code>/g, '`$1`'],
		[/<pre><code>(.*?)<\/code><\/pre>/gs, '```\n$1\n```\n'],
	];

	for (const [pattern, replacement] of replacements) {
		text = text.replace(pattern, replacement);
	}

	return text.replace(/\n{3,}/g, '\n\n').trim() as string;
}

function processLists(html: string) {
	html = html.replace(
		/<ul>([\s\S]*?)<\/ul>/g,
		(_: string, content: string) =>
			'\n' +
			content.replace(
				/\s*<li>(.*?)<\/li>/g,
				(_: string, item: string): string => {
					return `- ${item}\n`;
				},
			) +
			'\n',
	);

	html = html.replace(
		/<ol>([\s\S]*?)<\/ol>/g,
		(_: string, content: string): string => {
			let index = 1;
			return (
				'\n' +
				content.replace(
					/\s*<li>(.*?)<\/li>/g,
					(_: string, item: string): string =>
						`${index++}. ${item}\n`,
				) +
				'\n'
			);
		},
	);

	return html;
}

function processTables(html: string): string {
	const cleanHtml = html.replace(/<\/?t(body|head|foot)>/g, '');

	return cleanHtml.replace(/<table>(.*?)<\/table>/gs, (_match, content) => {
		const rows = content.match(/<tr.*?>.*?<\/tr>/gs);
		if (!rows) return '';

		let mdTable = '\n';

		rows.forEach((row: string, i: number) => {
			const cells = row.match(/<(?:td|th).*?>(.*?)<\/(?:td|th)>/gs) || [];
			const rowContent = cells
				.map(cell => cell.replace(/<.*?>/g, '').trim())
				.join(' | ');

			mdTable += `| ${rowContent} |\n`;

			if (i === 0) {
				const separator = cells.map(() => '---').join(' | ');
				mdTable += `| ${separator} |\n`;
			}
		});

		return mdTable;
	});
}

function processCheckboxes(html: string): string {
	return html.replace(
		/(<label>.*?<\/label>\s*)+/g,
		(match: string) =>
			'\n' +
			match.replace(
				/\s*<label><input type="checkbox"( checked)?>\s*(.*?)<\/label>/g,
				(_m: string, checked: string, text: string): string => {
					const check = checked ? 'x' : ' ';
					return `- [${check}] ${text.trim()}\n`;
				},
			) +
			'\n',
	);
}
