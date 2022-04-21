const ACTIVE = 'A';
const DISABLED = 'D';
const STOP_SELL = 'S';
const DEFAULT = ACTIVE;

const PropertyStatus = Object.freeze({
  DEFAULT,
  DISABLED,
  ACTIVE,
  STOP_SELL,
});

export const getPropertyTypeName = (type) => {
  if (type === PropertyStatus.SELL) {
    return 'Đang rao';
  } else if (type === PropertyStatus.STOP_SELL) {
    return 'Ngừng rao';
  } else if (type === PropertyStatus.DISABLED) {
    return 'Đã hủy';
  }
  //DEFAULT
  return ' Không xác định';
};

export default PropertyStatus;
