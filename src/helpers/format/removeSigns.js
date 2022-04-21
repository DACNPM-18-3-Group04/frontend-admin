export default function removeSigns(str) {
  if (!str) {
    return '';
  }
  return str.normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}