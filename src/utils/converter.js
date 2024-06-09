export function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  return `${day}-${month}-${year}`;
}

export function formatCurrency(amount) {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
  return formatter.format(amount);
}

export function removeCurrencyFormat(amount) {
  const cleaned = amount.replace(/[^\d]/g, "");
  return cleaned;
}

export const formatDateMonth = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString([], {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
