export default function formatArea(areaVal = 0) {
  return areaVal?.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') || 0;
}
