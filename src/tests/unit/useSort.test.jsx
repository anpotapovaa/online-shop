import { renderHook, act } from '@testing-library/react'
import { useSort } from '../../hooks/useSort'

describe('useSort', () => {
  const items = [
    { id: 1, price: 300, name: "Banana" },
    { id: 2, price: 100, name: "Apple" }, 
    { id: 3, price: 200, name: "Carrot" }
  ]

  it('сортирует по возрастанию цены (ASC)', () => {
    const { result } = renderHook(() => useSort(items)) 

    act(() => {
      result.current.setSortType("ASC") 
    })

    expect(result.current.sortedItems[0].price).toBe(100) 
    expect(result.current.sortedItems[2].price).toBe(300)
  })

  it('сортирует по убыванию цены (DESC)', () => {
    const { result } = renderHook(() => useSort(items))

    act(() => {
      result.current.setSortType("DESC")
    })

    expect(result.current.sortedItems[0].price).toBe(300)
    expect(result.current.sortedItems[2].price).toBe(100)
  })

  it('сортирует по имени (NAME)', () => {
    const { result } = renderHook(() => useSort(items))

    act(() => {
      result.current.setSortType("NAME")
    })

    const names = result.current.sortedItems.map(i => i.name)
    expect(names).toEqual(["Apple", "Banana", "Carrot"])
  })
})
