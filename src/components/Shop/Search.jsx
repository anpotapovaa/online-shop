import { useEffect, useState } from "react";

export default function Search({
  value,
  onDebouncedChange,
  delay = 400,
  placeholder = "Search",
  classNameInput = "input search-row",
}) {
  const [local, setLocal] = useState(value || "");

  useEffect(() => {
    setLocal(value || "");
  }, [value]);

  useEffect(() => {
    const t = setTimeout(() => {
      onDebouncedChange?.(local);
    }, delay);
    return () => clearTimeout(t);
  }, [local, delay, onDebouncedChange]);

  return (
    <input
      type="text"
      value={local}
      onChange={(e) => setLocal(e.target.value)}
      placeholder={placeholder}
      className={classNameInput}
    />
  );
}
