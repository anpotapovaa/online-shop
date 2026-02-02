import { render, screen, fireEvent } from '@testing-library/react' 
import Cart from '../../components/Cart/Cart'

describe('Cart', () => { 
  const products = [
    { id: 1, name: "T-shirt", price: 100 }, 
    { id: 2, name: "Shoes", price: 200 }
  ]

  const cart = [
    { id: 1, qty: 2 },
    { id: 2, qty: 1 }
  ]

  const removeFromCart = vi.fn() 
  const incrementQty = vi.fn()
  const decrementQty = vi.fn()

  it('отображает товары из корзины', () => {
    render(
      <Cart
        products={products}
        cart={cart}
        removeFromCart={removeFromCart} 
        incrementQty={incrementQty}
        decrementQty={decrementQty}
      />
    )

    expect(screen.getByText('T-shirt')).toBeInTheDocument() 
    expect(screen.getByText('Shoes')).toBeInTheDocument()
  })

  it('правильно считает итоговую сумму', () => {
    render(
      <Cart
        products={products}
        cart={cart}
        removeFromCart={removeFromCart}
        incrementQty={incrementQty}
        decrementQty={decrementQty}
      />
    )

    // 100 * 2 + 200 * 1 = 400
    expect(screen.getByText(/\$400/)).toBeInTheDocument() 
  })
})
