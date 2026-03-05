import { useState } from "react";
import emailjs from "@emailjs/browser";

function Products() {
  const prices = {
    "0.5kg": 60,
    "1kg": 110,
    "5kg": 500,
  };

  const [weight, setWeight] = useState("0.5kg");
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddToCart = () => {
    if (quantity < 1) return;

    const newItem = {
      weight,
      quantity,
      price: prices[weight],
      total: prices[weight] * quantity,
    };

    setCart([...cart, newItem]);
    setQuantity(1);
  };

  const grandTotal = cart.reduce((sum, item) => sum + item.total, 0);

  const handlePlaceOrder = async () => {
    setError("");
    setSuccess("");

   const storedUser = localStorage.getItem("user");

if (!storedUser || storedUser === "undefined") {
  setError("Please login first to place an order.");
  return;
}

let user;

try {
  user = JSON.parse(storedUser);
} catch (err) {
  setError("User data corrupted. Please login again.");
  return;
}

   

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    const orderList = cart.map(item => `
    <tr>
      <td>${item.weight}</td>
      <td>${item.quantity}</td>
      <td>₹${item.total}</td>
    </tr>
  `).join("");

    try {
      setLoading(true);

      await emailjs.send(
        "service_iw78gge",
        "template_o87dfee",
        {
          username: user.username,
          mobile: user.mobile,
          total: grandTotal,
          order_list: orderList
        },
        "gQDtgQrQ7TJe-y9Y2"
      );

      setSuccess("🎉 Order placed successfully!");
      setCart([]);
      setQuantity(1);

      // ✅ Auto hide message after 3 seconds
      setTimeout(() => {
        setSuccess("");
      }, 3000);

    } catch (err) {
      console.error(err);
      setError("❌ Order failed. Please try again.");

      setTimeout(() => {
        setError("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="products-page">
      <h1>Our Products</h1>

      <div className="product-card">
        <h2>Premium Laundry Detergent</h2>

        <label>Select Weight:</label>
        <select
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        >
          <option value="0.5kg">0.5 KG</option>
          <option value="1kg">1 KG</option>
          <option value="5kg">5 KG</option>
        </select>

        <label>Quantity:</label>
        <div className="quantity-box">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
            -
          </button>

          <input
            type="number"
            value={quantity}
            min="1"
            onChange={(e) =>
              setQuantity(Number(e.target.value) || 1)
            }
          />

          <button onClick={() => setQuantity(quantity + 1)}>
            +
          </button>
        </div>

        <h3>Price per packet: ₹{prices[weight]}</h3>

        <button className="add-btn" onClick={handleAddToCart}>
          Add
        </button>
        {/* Message should appear here */}
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>

      {cart.length > 0 && (
        <div className="cart-section">
          <h2>Selected Items</h2>

          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              {item.weight} × {item.quantity} = ₹{item.total}
            </div>
          ))}

          <h2>Grand Total: ₹{grandTotal}</h2>



          <button
            className="order-btn"
            onClick={handlePlaceOrder}
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Products;