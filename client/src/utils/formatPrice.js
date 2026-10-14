/**
 * Formats a number as Ghanaian Cedis, e.g. formatPrice(1240) -> "₵1,240"
 *
 * Uses manual formatting rather than Intl's currency formatter because
 * browser/Node ICU data for GHS symbol rendering is inconsistent — this
 * guarantees the same "₵" symbol every time, everywhere.
 */
export function formatPrice(amount) {
  const formattedNumber = new Intl.NumberFormat("en-GH", {
    maximumFractionDigits: 0,
  }).format(amount);
  return `₵${formattedNumber}`;
}