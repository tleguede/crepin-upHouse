export const textMaxSize = (text = '') => {
  return text?.length > 40 ? text.substring(0, 19) + '...' : text;
};