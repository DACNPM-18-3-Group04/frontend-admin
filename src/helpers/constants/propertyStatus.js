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

export const PROPERTY_STATUS = Object.freeze({
  A: {
    color: 'success',
    text: 'Đang rao',
    isDisabled: false,
  },
  S: {
    color: 'warning',
    text: 'Ngừng rao',
    isDisabled: false,
  },
  D: {
    color: 'error',
    text: 'Đã vô hiệu',
    isDisabled: true,
  },
});

export const getPropertyStatusName = (type) => {
  if (type === PropertyStatus.SELL) {
    return 'Đang rao';
  } else if (type === PropertyStatus.STOP_SELL) {
    return 'Ngừng rao';
  } else if (type === PropertyStatus.DISABLED) {
    return 'Đã vô hiệu';
  }
  //DEFAULT
  return ' Không xác định';
};

export default PropertyStatus;
