import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import Shop from "../../components/Shop/ShopPage";

const mockProducts = [
  { id: 1, name: "Red Shirt", price: 10, image: "img1.jpg", categories: ["Shirts"], color: "Red", isNew: true },
  { id: 2, name: "Blue Pants", price: 20, image: "img2.jpg", categories: ["Pants"], color: "Blue", isSale: true },
];

describe("Shop page integration", () => {

  test("на витрине поиск фильтрует список товаров", async () => {
    render(
      <Shop
        products={mockProducts}
        favorites={[]}
        toggleFavorite={() => {}}
        addToCart={() => {}}
      />
    );

    const searchInput = screen.getByPlaceholderText(/Search/i);
    fireEvent.change(searchInput, { target: { value: "Red" } });

    await waitFor(() => {
      expect(screen.getByText("Red Shirt")).toBeInTheDocument();
      expect(screen.queryByText("Blue Pants")).not.toBeInTheDocument();
    });
  });

  test("добавление товара с витрины отображается в корзине и обновляет счётчик", async () => {
    const addToCart = vi.fn();

    render(
      <Shop
        products={mockProducts}
        favorites={[]}
        toggleFavorite={() => {}}
        addToCart={addToCart}
      />
    );

    const addButton = screen.getAllByText(/Add to cart/i)[0];
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(addToCart).toHaveBeenCalledTimes(1);
      expect(addToCart).toHaveBeenCalledWith(mockProducts[0].id);
    });
  });

});
