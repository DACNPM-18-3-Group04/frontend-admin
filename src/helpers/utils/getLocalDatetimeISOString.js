export default function getLocalDatetimeISOString(ISODateTimeString) {
  const datetime = new Date(ISODateTimeString);
  return datetime.toLocaleString('en-GB');
}
