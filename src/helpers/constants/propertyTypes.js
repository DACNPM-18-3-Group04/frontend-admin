const LENT = 'L';
const SELL = 'S';
const DEFAULT = SELL;

const PropertyTypes = Object.freeze({
  DEFAULT,
  SELL,
  LENT,
});

export const PROPERTY_TYPE = Object.freeze({
  S: {
    color: 'info',
    text: 'Đăng bán',
  },
  L: {
    color: 'warning',
    text: 'Cho thuê',
  },
});

export const getPropertyTypeName = (type) => {
  if (type === PropertyTypes.SELL) {
    return 'Đăng bán';
  } else if (type === PropertyTypes.LENT) {
    return 'Cho thuê';
  }
  //DEFAULT
  return ' Không xác định';
};

export default PropertyTypes;
