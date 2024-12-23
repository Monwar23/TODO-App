import { useState } from 'react';

const useLocalStorage = (key, initialValue) => {
  // Get the stored value or set the default initial value
  const storedValue = localStorage.getItem(key);
  const parsedValue = storedValue ? JSON.parse(storedValue) : initialValue;

  const [value, setValue] = useState(parsedValue);

  // Update localStorage when value changes
  const setStoredValue = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));  
  };

  return [value, setStoredValue];
};

export default useLocalStorage;
