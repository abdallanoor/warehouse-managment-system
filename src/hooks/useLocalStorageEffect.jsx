import { useEffect } from "react";

const useLocalStorageEffect = (key, setter) => {
  const storedValue = localStorage.getItem(key);
  useEffect(() => {
    if (storedValue) {
      setter(JSON.parse(storedValue));
    }
  }, [storedValue, setter]);
};

export default useLocalStorageEffect;
