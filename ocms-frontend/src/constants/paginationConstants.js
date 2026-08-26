export const PAGINATION = {
  DEFAULT_PAGE: 0,
  DEFAULT_PAGE_SIZE: Number(import.meta.env.VITE_DEFAULT_PAGE_SIZE) || 10,
  MAX_PAGE_SIZE: Number(import.meta.env.VITE_MAX_PAGE_SIZE) || 100,

  DOCTOR_SEARCH_SIZE:Number(import.meta.env.VITE_DOCTOR_SEARCH_SIZE) || 5,
  DOCTOR_SEARCH_MIN_LENGTH:Number(import.meta.env.VITE_DOCTOR_SEARCH_MIN_LENGTH) || 2,
};