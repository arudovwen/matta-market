const getItem = (key) => {
  const data = typeof window !== 'undefined' ? localStorage.getItem(key) : '';

  try {
    return JSON.parse(data);
  } catch (err) {
    return data;
  }
};

const setItem = (key, value) => {
  if (typeof window === 'undefined') return;
  const stringify = typeof value !== 'string' ? JSON.stringify(value) : value;
  return localStorage.setItem(key, stringify);
};

const removeItem = (key) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
};

export { getItem, setItem, removeItem };
