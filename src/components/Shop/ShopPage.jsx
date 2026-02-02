import { useEffect, useMemo, useState } from "react";
import { useSort } from "../../hooks/useSort";

import styles from "./Shop.module.css";
import CommonsStyles from "../../styles/Commons.module.css";
import "../../index.css";

import searchIcon from "../../assets/icons/search.svg";
import heartIcon from "../../assets/icons/heart.svg";
import seasonSale from "../../assets/imagines/season-sale-banner.svg";

import Search from "./Search";
import Categories from "./Categories";
import Price from "./Price";
import Colors from "./Colors";
import Sort from "./Sort";
import Pagination from "./Pagination";

export default function Shop({
  products: initialProducts,
  favorites,
  toggleFavorite,
  addToCart,
}) {
  // товары
  const [products, setProducts] = useState(initialProducts || []);
  const [isLoadedFromProps] = useState(!!initialProducts?.length); //Флаг: данные пришли с наружи, не загружаем локально

  // фильтры
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedColors, setSelectedColors] = useState([]);

  // товары после фильтрации
  const [filteredProducts, setFilteredProducts] = useState([]);

  const {
    sortedItems: sortedProducts,
    sortType,
    setSortType,
  } = useSort(filteredProducts); //сортировка отфлиртрованных товаров

  // пагинация
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // загрузка продуктов (если не передали сверху)
  useEffect(() => {
    if (isLoadedFromProps) {
      setProducts(initialProducts);
      setFilteredProducts(initialProducts);
    } else {
      const list = Array.isArray(productsData?.products)
        ? productsData.products
        : productsData;
      setProducts(list);
      setFilteredProducts(list);
    }
  }, [initialProducts, isLoadedFromProps]);

  // вычисляем доступные фильтры (категории, цвета, цены)
  const filterOptions = useMemo(() => {
    const categoriesSet = new Set();
    const colorsSet = new Set();
    let min = Infinity;
    let max = -Infinity;

    products.forEach((p) => {
      (p.categories || []).forEach((c) => categoriesSet.add(c));
      if (p.color) colorsSet.add(p.color);
      if (typeof p.price === "number") {
        min = Math.min(min, p.price);
        max = Math.max(max, p.price);
      }
    });

    return {
      categories: ["All", ...Array.from(categoriesSet)],
      colors: Array.from(colorsSet),
      min: min === Infinity ? 0 : Math.floor(min),
      max: max === -Infinity ? 0 : Math.ceil(max),
    };
  }, [products]);

  // авто-применение фильтров при изменении значений
  useEffect(() => {
    applyFilters();
  }, [query, selectedCategory, minPrice, maxPrice, selectedColors, products]);

  const applyFilters = () => {
    let result = [...products];

    // фильтрация: поиск, категории, цена, цвета
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }

    if (selectedCategory && selectedCategory !== "All") {
      result = result.filter((p) =>
        (p.categories || []).includes(selectedCategory),
      );
    }

    const minVal = minPrice !== "" ? Number(minPrice) : null;
    const maxVal = maxPrice !== "" ? Number(maxPrice) : null;
    if (minVal !== null || maxVal !== null) {
      result = result.filter((p) => {
        const price = Number(p.price);
        const passMin = minVal === null ? true : price >= minVal;
        const passMax = maxVal === null ? true : price <= maxVal;
        return passMin && passMax;
      });
    }

    if (selectedColors.length > 0) {
      result = result.filter((p) => selectedColors.includes(p.color));
    }

    setFilteredProducts(result);
    setCurrentPage(1); // при смене фильтров возвращаемся на 1 страницу
  };

  // количество страниц
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(sortedProducts.length / itemsPerPage)),
    [sortedProducts.length],
  );

  // товары для текущей страницы
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(start, start + itemsPerPage);
  }, [sortedProducts, currentPage]);

  return (
    <div className={CommonsStyles.container}>
      <div className={styles.shop}>
        {/* SIDEBAR */}
        <div className={styles.sidebar}>
          {/* Поиск */}
          <div className={styles.search}>
            <label>
              <Search
                value={query}
                onDebouncedChange={setQuery}
                placeholder="Search"
                classNameInput={`${CommonsStyles.input} ${styles["search-row"]}`}
              />
              <img
                src={searchIcon}
                alt="Search Icon"
                className={styles["search-icon"]}
              />
            </label>
          </div>

          {/* Категории */}
          <div className={styles["sidebar-item"]}>
            <div className={styles["sidebar-title"]}>Categories</div>
            <div className={styles["sidebar-content"]}>
              <Categories
                categories={filterOptions.categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                listClass={styles["custom-list"]}
                itemClass={styles.item}
                activeClass={styles.active}
              />
            </div>
          </div>

          {/* Цена */}
          <div className={styles["sidebar-item"]}>
            <div className={styles["sidebar-title"]}>Price</div>
            <div className={styles["sidebar-content"]}>
              <Price
                minPrice={minPrice}
                maxPrice={maxPrice}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
                classNameBar={styles["price-bar"]}
                classNameInput={CommonsStyles.input}
                placeholderMin={filterOptions.min}
                placeholderMax={filterOptions.max}
              />
            </div>
          </div>

          {/* Цвета */}
          <div className={styles["sidebar-item"]}>
            <div className={styles["sidebar-title"]}>Colors</div>
            <div className={styles["sidebar-content"]}>
              <Colors
                colors={filterOptions.colors}
                selectedColors={selectedColors}
                setSelectedColors={setSelectedColors}
                wrapperClass={styles.colors}
                checkboxClass={styles["color-checkboxs"]}
                colorItemClass={styles.color}
                colorNameClass={styles["color-name"]}
              />
            </div>
          </div>

          {/* Кнопка применить */}
          <div className={styles["sidebar-item"]}>
            <div className={CommonsStyles.buttonWrapper}>
              <button className={CommonsStyles.button} onClick={applyFilters}>
                Apply Filter
              </button>
              <div className={CommonsStyles.verticalLine}></div>
            </div>
          </div>

          <div>
            <a href="#">
              <img src={seasonSale} alt="Season Sale Banner" />
            </a>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className={styles["products-wrapper"]}>
          {/* Количество товаров + сортировка */}
          <div className={styles["sort-and-count"]}>
            <div className={styles["products-count"]}>
              There are {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"} in this
              category
            </div>

            <Sort sortType={sortType} setSortType={setSortType} />
          </div>

          {/* Список продуктов */}
          <div className={styles.products}>
            {paginated.map((product) => (
              <div className={styles.product} key={product.id}>
                <div className={styles.photo}>
                  <div className={styles["top-bar"]}>
                    <div className={styles.labels}>
                      {product.isSale && (
                        <div className={`${styles.label} ${styles.sale}`}>
                          Sale
                        </div>
                      )}
                      {product.isNew && (
                        <div className={`${styles.label} ${styles.new}`}>
                          New
                        </div>
                      )}
                    </div>
                    <div className={styles.favorites}>
                      <img
                        src={heartIcon}
                        alt="heart"
                        onClick={() => toggleFavorite?.(product.id)}
                        className={
                          favorites?.includes(product.id) ? styles.active : ""
                        }
                        role="button"
                        aria-label="Toggle favorite"
                      />
                    </div>
                  </div>
                  <img
                    src={product.image}
                    alt={product.name}
                    onClick={() => addToCart?.(product.id)}
                  />
                </div>

                <div className={styles.info}>
                  <div className={styles.name}>{product.name}</div>
                  <div className={CommonsStyles.price}>
                    <div className={CommonsStyles.currentPrice}>
                      ${product.price}
                    </div>
                    {product.oldPrice && (
                      <div className={CommonsStyles.oldPrice}>
                        ${product.oldPrice}
                      </div>
                    )}
                  </div>

                  <div className={CommonsStyles.buttonWrapper}>
                    <button
                      className={CommonsStyles.button}
                      onClick={() => addToCart?.(product.id)}
                    >
                      Add to cart
                    </button>
                    <div className={CommonsStyles.verticalLine}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
