export default function formatCurrency(val = 0) {
  return val.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
}
