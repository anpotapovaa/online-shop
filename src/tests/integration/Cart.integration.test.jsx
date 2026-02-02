import { render, screen, fireEvent } from "@testing-library/react"; 
import Cart from "../../components/Cart/Cart";
import React from "react";

// Иммитация alert для предотвращения всплывающих окон реального браузера во время тестов
global.alert = vi.fn();

describe("Cart Integration Tests", () => { 
  const products = [
    { id: 1, name: "Red Shirt", price: 20, image: "img1" },
    { id: 2, name: "Blue Pants", price: 40, image: "img2" },
  ];

  let cart;
  let removeFromCart;
  let incrementQty;
  let decrementQty;

  beforeEach(() => {
    cart = [
      { id: 1, qty: 1 },
      { id: 2, qty: 2 }, 
    ];

    removeFromCart = vi.fn((id) => {
      cart = cart.filter((item) => item.id !== id);
    });

    incrementQty = vi.fn((id) => {
      cart = cart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      );
    }); 

    decrementQty = vi.fn((id) => {
      cart = cart.map((item) =>
        item.id === id ? { ...item, qty: item.qty - 1 } : item
      );
    });
  });

  const renderCart = () =>
    render(
      <Cart
        products={products}
        cart={cart}
        removeFromCart={removeFromCart}
        incrementQty={incrementQty}
        decrementQty={decrementQty}
      />
    );

  test("рендер корзины и правильные начальные суммы", () => {
    renderCart();

    expect(screen.getByText("Red Shirt")).toBeInTheDocument();
    expect(screen.getByText("Blue Pants")).toBeInTheDocument();

    // order price = 20*1 + 40*2 = 100
    expect(screen.getByText("$100.00")).toBeInTheDocument();

    // delivery fixed = $15
    expect(screen.getByText("$15")).toBeInTheDocument(); //

    // total = 100 + 15 = 115
    expect(screen.getByText("$115.00")).toBeInTheDocument();
  }); 

  test("увеличение количества товара пересчитывает сумму", () => {
    renderCart();

    const plusButton = screen.getAllByText("+")[0];
    fireEvent.click(plusButton);

    expect(incrementQty).toHaveBeenCalledWith(1); 
  });

  test("удаление товара вызывает removeFromCart", () => {
    renderCart();

    const deleteButtons = screen.getAllByText("X");
    fireEvent.click(deleteButtons[0]); 
    expect(removeFromCart).toHaveBeenCalledWith(1);
  });

  test("применение валидного промокода уменьшает итоговую сумму", () => {
    renderCart();

    const input = screen.getByPlaceholderText("Enter promo code");
    const applyButton = screen.getByRole("button", { name: /arrow/i });

    fireEvent.change(input, { target: { value: "ilovereact" } });
    fireEvent.click(applyButton);

    expect(global.alert).toHaveBeenCalledWith("🎉 Промокод применён! Скидка 10%");

    // после применения скидки total будет: 100 - 10% + 15 = 105

    expect(screen.getByText("$105.00")).toBeInTheDocument();
  });
});
