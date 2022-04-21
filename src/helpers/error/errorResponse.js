export const getErrorMessage = (error = {}) => {
  let errorMessage = '';
  if (error.response) {
    if (error.response.data) {
      // Server has responsed
      errorMessage = error.response.data.message;
      errorMessage += `(${error.response.status})`;
    } else {
      // Cannot contact server
      errorMessage = error.response.message;
    }
  } else {
    // There is no response for this error
    // --> Get error message
    errorMessage = error.message;
  }
  return errorMessage;
};

export const isErrorResponse = (response) => {
  if (!response.data) {
    // Response do not have data
    return true;
  }

  if (!response.data.success) {
    // Response is not success
    return true;
  }

  return false; // Is not an error repsonse
};

const ErrorResponseHelpers = {
  getErrorMessage,
  isErrorResponse,
};

export default ErrorResponseHelpers;
