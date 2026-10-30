
import { useState, useEffect } from "react";
import "./App.css";

function Header() {
  return (
    <header className="header">
      <h1>Amazon Product Store</h1>
    </header>
  );
}

function ProductCard({
  productName,
  price,
  quantity,
  selectedColor,
  deliveryCity,
  onAdd,
  onRemove,
  onReset,
}) {
  return (
    <section className="product-card">
      <div className="product-icon">🖱️</div>

      <h2>{productName}</h2>
      <p className="price">Price: ₹{price}</p>

      <p>
        Selected Colour: <strong>{selectedColor}</strong>
      </p>

      <p>
        Delivery City: <strong>{deliveryCity}</strong>
      </p>

      <p>
        Quantity: <strong>{quantity}</strong>
      </p>

      <div className="cart-buttons">
        <button onClick={onAdd}>Add to Cart</button>

        <button onClick={onRemove} disabled={quantity === 0}>
          Remove One
        </button>

        <button className="reset-btn" onClick={onReset}>
          Reset Cart
        </button>
      </div>

      <div className="cart-summary">
        <h3>Total: ₹{quantity * price}</h3>

        <p className={quantity === 0 ? "empty" : "success"}>
          {quantity === 0
            ? "Cart is empty"
            : "Product added to cart"}
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>© 2026 Amazon Product Store</p>
    </footer>
  );
}

function App() {
  const [quantity, setQuantity] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [deliveryCity, setDeliveryCity] = useState("Coimbatore");
  const [showProduct, setShowProduct] = useState(true);

  useEffect(() => {
    document.title = `Amazon Product Store - Quantity: ${quantity}`;

    return () => {
      document.title = "React App";
    };
  }, [quantity]);

  const productName = "Wireless Mouse";
  const price = 499;

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <button
          className="toggle-btn"
          onClick={() => setShowProduct(!showProduct)}
        >
          {showProduct ? "Hide Product" : "Show Product"}
        </button>

        {showProduct && (
          <>
            <section className="settings">
              <label htmlFor="color">
                Choose Colour:
              </label>

              <select
                id="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                <option value="Black">Black</option>
                <option value="Blue">Blue</option>
                <option value="White">White</option>
              </select>

              <label htmlFor="city">
                Delivery City:
              </label>

              <input
                id="city"
                type="text"
                value={deliveryCity}
                onChange={(e) => setDeliveryCity(e.target.value)}
                placeholder="Enter delivery city"
              />
            </section>

            <ProductCard
              productName={productName}
              price={price}
              quantity={quantity}
              selectedColor={selectedColor}
              deliveryCity={deliveryCity}
              onAdd={() => setQuantity(quantity + 1)}
              onRemove={() =>
                setQuantity((previous) => Math.max(0, previous - 1))
              }
              onReset={() => setQuantity(0)}
            />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
