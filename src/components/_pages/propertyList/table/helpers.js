export const getAddressDistrict = (district) => {
  let addressDistrict = '';
  if (!district || !district.name) {
    return addressDistrict;
  }
  addressDistrict = `${district.name}`;

  const province = district.province;
  if (!province || !province.name) {
    return addressDistrict;
  }

  return `${addressDistrict}, ${province.name}`;
};
