/* ensures file names are in the format MM-YYYY-lang.pdf (e.g. 03-2024-pt.pdf) */
export const hasValidName = (name: string) => {
	return /^(0[1-9]|1[0-2])-\d{4}-(pt|en)\.pdf$/.test(name);
};

/* extracts month, year, language and date from the file name */
export const parseFileName = (fileName: string) => {
	const match = fileName.match(/^(0[1-9]|1[0-2])-(\d{4})-(pt|en)\.pdf$/);

	if (!match) return null;

	const [, month, year, lang] = match;

	return {
		month: parseInt(month),
		year: parseInt(year),
		lang: lang as 'pt' | 'en',
		date: new Date(`${year}-${month}-01`),
	};
};

/* gets the month name in the specified language (ex: "DEC." and "DEZ.") */
export const getMonthName = (month: number, lang: 'pt' | 'en') => {
	let name = new Intl.DateTimeFormat(lang === 'pt' ? 'pt-PT' : 'en-US', { month: 'short' }).format(new Date(2000, month - 1));

	if (!name.endsWith('.')) {
		name += '.';
	}

	return name.toUpperCase();
};
