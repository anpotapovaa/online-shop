import { useState, useMemo } from "react";

/**
 * Хук для сортировки списка товаров
 * @param {Array} items - массив элементов для сортировки
 * @param {string} initialSort - тип сортировки по умолчанию
 */

export function useSort(items, initialSort = "RELEVANCE") {
  const [sortType, setSortType] = useState(initialSort);

  const sortedItems = useMemo(() => {
    let result = [...items];

    if (sortType === "ASC") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortType === "DESC") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortType === "NAME") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }
    return result;
  }, [items, sortType]);

  return { sortedItems, sortType, setSortType };
}
