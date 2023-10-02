export function formatCurrency(price: number) {
  if (typeof price !== 'number') {
    Number(price);
  }

  // Use toFixed(2) to round to 2 decimal places and convert to string
  const formattedPrice = price.toFixed(2);

  // Add commas for thousands separator
  const parts = formattedPrice.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Concatenate with the currency symbol
  return '$ ' + parts.join('.');
}
