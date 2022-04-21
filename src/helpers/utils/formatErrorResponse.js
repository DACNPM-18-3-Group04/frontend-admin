const formatErrorResponse = (error) => {
  let res = {};
  if (error.response && error.response.data) {
    if (error.response.data) {
      res = { ...error.response.data };
    }
    //Incase cannot request to server
    res.data = error.response.data;
    res.status = error.response.status;
  } else {
    res.message = error.message;
  }

  return res;
};

export default formatErrorResponse;
