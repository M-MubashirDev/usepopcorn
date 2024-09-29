import { useState, useEffect } from "react";
export function useLocalStorage(name, initial) {
  const [value, setvalue] = useState(function () {
    const localValue = localStorage.getItem(name);
    return JSON.parse(localValue) || [];
  });
  useEffect(() => {
    localStorage.setItem(name, JSON.stringify(value));
  }, [value, setvalue]);
  return [value, setvalue];
}
