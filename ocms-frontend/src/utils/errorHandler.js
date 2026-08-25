export const getErrorMessage = (error, fallbackMessage = "Đã xảy ra lỗi.") => {
  return error?.response?.data?.message || error?.message || fallbackMessage;
};
