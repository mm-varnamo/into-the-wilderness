export const formatCurrency = (value: number) =>
	new Intl.NumberFormat('en-EU', {
		style: 'currency',
		currency: 'EUR',
	}).format(value);
