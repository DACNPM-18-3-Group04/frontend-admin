import ErrorResponseHelpers from './errorResponse';

const ErrorHelpers = {
  isErrorResponse: ErrorResponseHelpers.isErrorResponse,
  getErrorMessage: ErrorResponseHelpers.getErrorMessage,
};

export const getErrorMessage = ErrorHelpers.getErrorMessage;
export const isErrorResponse = ErrorHelpers.isErrorResponse;

export default ErrorHelpers;
